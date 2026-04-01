import { useEffect, useRef } from "react";

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoId]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      className="w-full h-full bg-black"
    >
      <source
        src={`http://localhost:5000/api/stream/${videoId}`}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoPlayer;