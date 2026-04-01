import { useEffect, useState } from "react";
import API from "../services/api";

const EditorDashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await API.get("/videos");
      setVideos(res.data);
    };

    fetchVideos();
  }, []);

  const statusStyle = (status) => {
    return status === "done"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 shadow">
        <h1 className="text-3xl font-semibold">My Videos</h1>
        <p className="text-sm text-blue-100 mt-1">
          Manage and track your uploaded content
        </p>
      </div>

      <div className="p-8 space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <p className="text-sm text-gray-500">Total Videos</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {videos.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <p className="text-sm text-gray-500">Processed</p>
            <h2 className="text-2xl font-semibold text-green-600">
              {videos.filter(v => v.status === "done").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <p className="text-sm text-gray-500">Processing</p>
            <h2 className="text-2xl font-semibold text-yellow-600">
              {videos.filter(v => v.status === "processing").length}
            </h2>
          </div>

        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Uploads
          </h2>

          {videos.length === 0 ? (
            <p className="text-gray-500">No videos uploaded yet</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden"
                >

                  <div className="h-44 bg-black overflow-hidden">
                    {video.processedUrl ? (
                      <video
                        src={video.processedUrl}
                        className="w-full h-full object-cover"
                        muted
                        onMouseOver={(e) => e.target.play()}
                        onMouseOut={(e) => e.target.pause()}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Processing...
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">

                    <p className="font-medium text-sm truncate">
                      {video.filename}
                    </p>

                    <p className="text-xs text-gray-500">
                      {(video.size / (1024 * 1024)).toFixed(2)} MB
                    </p>

                    <div className="flex justify-between items-center">

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusStyle(
                          video.status
                        )}`}
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

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EditorDashboard;