
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;
    const videoElement = videoRef.current;

    if (videoElement) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // You can uncomment this to autoplay, but it's often blocked by browsers
          // videoElement.play();
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari and other browsers that support HLS natively
        videoElement.src = src;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} poster={poster} controls className="w-full h-full" />
    </div>
  );
};

export default VideoPlayer;
