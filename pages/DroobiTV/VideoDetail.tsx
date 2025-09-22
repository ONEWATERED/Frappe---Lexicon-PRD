
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VideoPlayer from '../../components/VideoPlayer';

const VideoDetail: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { droobiVideos } = useAuth();
  
  const video = droobiVideos.find(v => v.id === videoId);

  if (!video) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-2xl">Video not found.</h1>
        <Link to="/droobi-tv" className="text-blue-400 hover:underline mt-4 inline-block">Back to Droobi TV</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />
          <div className="mt-6">
            <span className="text-sm font-semibold uppercase text-blue-400">{video.category}</span>
            <h1 className="text-3xl font-extrabold text-white mt-2">{video.title}</h1>
            <div className="flex items-center space-x-4 text-slate-400 mt-2 text-sm">
                <span>{new Date(video.airDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>{video.durationMinutes} min</span>
            </div>
            <p className="mt-4 text-lg text-slate-300">{video.description}</p>
          </div>
        </div>
        <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-4">Up Next</h2>
            {/* Placeholder for related videos */}
            <div className="space-y-4">
               {droobiVideos.filter(v => v.id !== videoId).slice(0, 3).map(nextVideo => (
                    <Link to={`/video/${nextVideo.id}`} key={nextVideo.id} className="flex items-start space-x-4 bg-slate-800/50 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <img src={nextVideo.thumbnailUrl} alt={nextVideo.title} className="w-32 h-20 object-cover rounded"/>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-200">{nextVideo.title}</h3>
                            <p className="text-xs text-slate-400 mt-1">{nextVideo.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
