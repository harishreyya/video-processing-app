import { useEffect, useState } from "react";
import API from "../services/api";
import VideoPlayer from "../components/VideoPlayer";

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async () => {
    const query = filter !== "all" ? `?status=${filter}` : "";
    const res = await API.get(`/videos${query}`);
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Video Library
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="processing">Processing</option>
          <option value="done">Completed</option>
        </select>
      </div>

      {videos.length === 0 ? (
        <p className="text-gray-500">No videos found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="h-44 bg-black">
                {video.processedUrl ? (
                  <video
                    src={video.processedUrl}
                    className="w-full h-full object-cover"
                    muted
                      onMouseOver={(e) => e.target.play()}
  onMouseOut={(e) => e.target.pause()}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Processing...
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="font-medium truncate">
                  {video.filename}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {(video.size / (1024 * 1024)).toFixed(2)} MB
                </p>

                <div className="mt-3 flex items-center justify-between">

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

                {video.processedUrl && (
  <button
    onClick={() => setSelectedVideo(video)}
    className="mt-3 w-full text-sm bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
  >
    ▶ Play Video
  </button>
)}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVideo && (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    onClick={() => setSelectedVideo(null)}
  >
    <div
      className="bg-black rounded-xl overflow-hidden w-full max-w-4xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedVideo(null)}
        className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded z-10"
      >
        ✕
      </button>

        <VideoPlayer videoId={selectedVideo._id} />
    </div>
  </div>
)}
    </div>
  );
};

export default VideoLibrary;