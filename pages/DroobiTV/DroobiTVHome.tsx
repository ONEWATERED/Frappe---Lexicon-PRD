





import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DroobiVideo } from '../../types';

const VideoCard: React.FC<{ video: DroobiVideo }> = ({ video }) => (
  <Link to={`/video/${video.id}`} className="flex-shrink-0 w-72 sm:w-80 group">
    <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden">
      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="mt-2">
      <h3 className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{video.title}</h3>
      <p className="text-sm text-slate-400">{video.category}</p>
    </div>
  </Link>
);

const DroobiTVHome: React.FC = () => {
  const { droobiVideos } = useAuth();
  const featuredVideo = droobiVideos[0];
  
  const videosByCategory = useMemo(() => {
    // FIX: Provided a generic type to `reduce` to ensure the accumulator `acc` is correctly typed as Record<string, DroobiVideo[]>. This resolves the error where `videos.map` was called on an `unknown` type.
    return droobiVideos.reduce<Record<string, DroobiVideo[]>>((acc, video) => {
      const category = video.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(video);
      return acc;
    }, {});
  }, [droobiVideos]);
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {featuredVideo && (
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <img src={featuredVideo.thumbnailUrl} alt={featuredVideo.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">{featuredVideo.title}</h1>
            <p className="mt-4 text-slate-300">{featuredVideo.description}</p>
            <Link to={`/video/${featuredVideo.id}`} className="mt-6 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
              Watch Now
            </Link>
          </div>
        </div>
      )}
      
      <div className="space-y-12">
        {Object.entries(videosByCategory).map(([category, videos]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
            <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 -mx-4 px-4">
              {videos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroobiTVHome;