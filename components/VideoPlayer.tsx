
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  poster, 
  autoPlay = false, 
  loop = false, 
  muted = false, 
  controls = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let hls: Hls | null = null;
    const videoElement = videoRef.current;

    if (videoElement && !error) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            console.error('HLS fatal error:', data);
            setError(true);
          }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = src;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, error]);

  const handleError = () => {
    setError(true);
  };

  const containerClasses = "w-full h-full bg-black rounded-lg overflow-hidden relative";

  if (autoPlay) {
    return (
      <div className={containerClasses.replace(' aspect-video', '')}>
        {!error && (
            <video 
              ref={videoRef} 
              poster={poster} 
              controls={controls} 
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline
              className="w-full h-full object-cover"
              onError={handleError}
            />
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {error ? (
        <>
            {poster && <img src={poster} alt="Video poster" className="absolute inset-0 w-full h-full object-cover opacity-20" />}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white bg-slate-800/50">
                 <p className="font-semibold">Could not load video.</p>
            </div>
        </>
      ) : (
        <video 
          ref={videoRef} 
          poster={poster} 
          controls={controls} 
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
          onError={handleError}
        />
      )}
    </div>
  );
};

export default VideoPlayer;