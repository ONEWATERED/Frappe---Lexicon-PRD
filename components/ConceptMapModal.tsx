import React, { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { LexiconTerm } from '../types';
import { XMarkIcon } from './icons/Icons';

interface ConceptMapModalProps {
  term: LexiconTerm;
  allTerms: LexiconTerm[];
  onClose: () => void;
}

// FIX: Changed GraphNode to a type alias with an intersection. This ensures that
// the properties from d3.SimulationNodeDatum (like x, y, fx, fy) are correctly
// associated with the GraphNode type, resolving "property does not exist" errors.
type GraphNode = d3.SimulationNodeDatum & {
  id: string;
  term: string;
  level: number;
};

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
}

const ConceptMapModal: React.FC<ConceptMapModalProps> = ({ term, allTerms, onClose }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const addedNodeIds = new Set<string>();

    const addNode = (termId: string, level: number) => {
      if (addedNodeIds.has(termId)) return;
      const termData = allTerms.find(t => t.id === termId);
      if (termData) {
        nodes.push({ id: termId, term: termData.term, level });
        addedNodeIds.add(termId);
      }
    };

    // Level 0: The central term
    addNode(term.id, 0);

    // Level 1: Directly related terms
    term.relatedTermIds?.forEach(relatedId => {
      addNode(relatedId, 1);
      links.push({ source: term.id, target: relatedId });

      // Level 2: Terms related to the Level 1 terms
      const level1Term = allTerms.find(t => t.id === relatedId);
      level1Term?.relatedTermIds?.slice(0, 2).forEach(level2Id => { // Limit to 2 to keep it clean
        if (level2Id !== term.id) {
          addNode(level2Id, 2);
          links.push({ source: relatedId, target: level2Id });
        }
      });
    });

    return { nodes, links };
  }, [term, allTerms]);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const simulation = d3.forceSimulation<GraphNode>(graphData.nodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(graphData.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#475569") // slate-600
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .join("g")
      .call(drag(simulation) as any);

    const circles = node.append("circle")
      .attr("r", d => d.level === 0 ? 15 : d.level === 1 ? 10 : 7)
      .attr("fill", d => d.level === 0 ? '#60A5FA' : d.level === 1 ? '#94A3B8' : '#475569') // blue-400, slate-400, slate-600
      .attr("stroke", "#0F172A") // slate-900
      .attr("stroke-width", 2);

    const labels = node.append("text")
      .text(d => d.term)
      .attr("x", 0)
      .attr("y", d => d.level === 0 ? -25 : d.level === 1 ? -20 : -15)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    node.on("mouseover", (event, d) => {
        link.attr('stroke', l => (l.source as GraphNode).id === d.id || (l.target as GraphNode).id === d.id ? '#60A5FA' : '#475569');
        circles.attr('opacity', n => {
            const isLinked = graphData.links.some(l => 
                ((l.source as GraphNode).id === d.id && (l.target as GraphNode).id === n.id) || 
                ((l.target as GraphNode).id === d.id && (l.source as GraphNode).id === n.id)
            );
            return n.id === d.id || isLinked ? 1 : 0.3;
        });
        labels.attr('opacity', n => n.id === d.id ? 1 : 0.3);
    })
    .on("mouseout", () => {
        link.attr('stroke', '#475569');
        circles.attr('opacity', 1);
        labels.attr('opacity', 1);
    })
    .on("click", (event, d) => {
        navigate(`/term/${d.id}`);
        onClose();
    });


    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as GraphNode).x!)
        .attr("y1", d => (d.source as GraphNode).y!)
        .attr("x2", d => (d.target as GraphNode).x!)
        .attr("y2", d => (d.target as GraphNode).y!);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: d3.Simulation<GraphNode, undefined>) {
        function dragstarted(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
          d.fx = event.x;
          d.fy = event.y;
        }
        function dragended(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
        return d3.drag<SVGGElement, GraphNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
    
  }, [graphData, navigate, onClose]);


  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full h-full relative">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-4 bg-slate-800/50 p-2 rounded-lg">
          <div className="text-white text-sm hidden md:block">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span> Current Term
            <span className="inline-block w-3 h-3 rounded-full bg-slate-400 ml-4 mr-2"></span> 1st Degree
            <span className="inline-block w-3 h-3 rounded-full bg-slate-600 ml-4 mr-2"></span> 2nd Degree
          </div>
          <button onClick={onClose} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>
    </div>
  );
};

export default ConceptMapModal;