import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";
import { useAuth } from "../context/AuthContext";

const Upload = () => {
    const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});

  const fetchVideos = async () => {
    const res = await API.get("/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
  socket.on("video-progress", (data) => {
    setVideoProgress((prev) => ({
      ...prev,
      [data.videoId]: data,
    }));

      if (data.status === "done") {
      fetchVideos();
    }
  });

  return () => socket.off("video-progress");
}, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      setLoading(true);
      setProgress(0);

      await API.post("/videos/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      setFile(null);
      fetchVideos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Video Upload Dashboard
      </h1>

      {(user?.role === "editor" || user?.role === "admin") && (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

    <h2 className="text-lg font-medium mb-4">
      Upload New Video
    </h2>

    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
      <input
        type="file"
        accept="video/*"
        className="hidden"
        id="fileInput"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <label htmlFor="fileInput" className="cursor-pointer">
        <p className="text-gray-600">
          Click to upload or drag video here
        </p>
        {file && (
          <p className="text-blue-600 mt-2 text-sm">
            {file.name}
          </p>
        )}
      </label>
    </div>

    <button
      onClick={handleUpload}
      disabled={loading}
      className={`mt-4 w-full py-2.5 rounded-lg text-white font-medium transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Uploading..." : "Upload Video"}
    </button>

  </div>
)}

{user?.role === "viewer" && (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
    You have read-only access. Upload is disabled.
  </div>
)}

      <div>
        <h2 className="text-lg font-medium mb-4">
          Your Videos
        </h2>

        {videos.length === 0 ? (
          <p className="text-gray-500">No videos uploaded yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-xl shadow-sm p-4 border"
              >
                <div className="h-40 bg-black rounded mb-3 overflow-hidden">
  {video.processedUrl ? (
    <video
      src={video.processedUrl}
      className="w-full h-full object-cover"
      muted
    />
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400">
      Processing...
    </div>
  )}
</div>

                <p className="text-sm font-medium truncate">
                  {video.filename}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {(video.size / (1024 * 1024)).toFixed(2)} MB
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      video.status === "done"
                        ? "bg-green-100 text-green-700"
                        : video.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {video.status}
                  </span>

                  {video.sensitivity && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        video.sensitivity === "safe"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {video.sensitivity}
                    </span>
                  )}
                </div>

               {videoProgress[video._id] &&
  videoProgress[video._id].status !== "done" && (
    <div className="mt-2">
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all duration-300"
          style={{
            width: `${videoProgress[video._id].progress}%`,
          }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {videoProgress[video._id].progress}%
      </p>
    </div>
)}

                {video.processedUrl && (
                 <button
  onClick={() => setSelectedVideo(video.processedUrl)}
  className="mt-3 w-full text-sm bg-gray-900 text-white py-1.5 rounded hover:bg-black transition"
>
  Play Video
</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedVideo && (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    onClick={() => setSelectedVideo(null)} 
  >
    <div
      className="bg-white rounded-xl overflow-hidden w-full max-w-3xl relative"
      onClick={(e) => e.stopPropagation()} 
    >
      <button
        onClick={() => setSelectedVideo(null)}
        className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded z-10"
      >
        ✕
      </button>

      <video
        src={selectedVideo}
        controls
        autoPlay
        className="w-full h-[400px] bg-black"
      />
    </div>
  </div>
)}
    </div>
  );
};

export default Upload;