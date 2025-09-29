import React from 'react';
import { KnowledgeMapData } from '../types';

interface KnowledgeMapProps {
  data: KnowledgeMapData;
}

const KnowledgeMap: React.FC<KnowledgeMapProps> = ({ data }) => {
  const width = 500;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 120;
  const baseNodeRadius = 10;

  const nodePositions: Record<string, { x: number; y: number }> = {};
  
  // Calculate positions in a circle
  data.nodes.forEach((node, i) => {
    const angle = (i / data.nodes.length) * 2 * Math.PI;
    nodePositions[node.id] = {
      x: centerX + radius * Math.cos(angle - Math.PI / 2),
      y: centerY + radius * Math.sin(angle - Math.PI / 2),
    };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Render Links */}
      {data.links.map((link, i) => {
        const sourcePos = nodePositions[link.source];
        const targetPos = nodePositions[link.target];
        const isSuggestedLink = data.nodes.find(n => n.id === link.source)?.isSuggested || data.nodes.find(n => n.id === link.target)?.isSuggested;
        if (!sourcePos || !targetPos) return null;
        return (
          <line
            key={i}
            x1={sourcePos.x}
            y1={sourcePos.y}
            x2={targetPos.x}
            y2={targetPos.y}
            stroke={isSuggestedLink ? "#475569" : "#64748b"}
            strokeWidth="1.5"
            strokeDasharray={isSuggestedLink ? "4 4" : "none"}
          />
        );
      })}

      {/* Render Nodes and Labels */}
      {data.nodes.map(node => {
        const pos = nodePositions[node.id];
        const nodeRadius = baseNodeRadius + (node.activityCount / 5);
        if (!pos) return null;
        return (
          <g key={node.id} className="cursor-pointer group">
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius}
              fill={node.isSuggested ? "#334155" : "url(#nodeGrad)"}
              stroke={node.isSuggested ? "#64748b" : "#60a5fa"}
              strokeWidth="2"
              strokeDasharray={node.isSuggested ? "3 3" : "none"}
              className="group-hover:stroke-white transition-all"
            />
            <text
              x={pos.x}
              y={pos.y > centerY ? pos.y + nodeRadius + 14 : pos.y - nodeRadius - 8}
              textAnchor="middle"
              fill={node.isSuggested ? "#94a3b8" : "#e2e8f0"}
              fontSize="12"
              fontWeight="bold"
              className="group-hover:fill-white transition-all select-none pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default KnowledgeMap;
