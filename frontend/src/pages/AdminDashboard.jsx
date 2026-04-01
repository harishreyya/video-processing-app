import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    const query = roleFilter !== "all" ? `?role=${roleFilter}` : "";
    const res = await API.get(`/users${query}`);
    setUsers(res.data);
  };

  const fetchVideos = async () => {
    const res = await API.get("/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchVideos();
  }, [roleFilter]);

  const roleStyle = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "editor":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusStyle = (status) => {
    return status === "done"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-6 shadow">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-gray-300 mt-1">
          Manage users and monitor all uploaded videos
        </p>
      </div>

      <div className="p-8 space-y-8">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Users Overview
          </h2>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="editor">Editors</option>
            <option value="viewer">Viewers</option>
          </select>
        </div>

       <div className="bg-white rounded-2xl shadow-md overflow-hidden">
  <table className="w-full table-fixed text-sm">

    <thead className="bg-gray-100 text-gray-600">
      <tr>
        <th className="w-1/3 text-left px-6 py-3">Name</th>
        <th className="w-1/3 text-left px-6 py-3">Email</th>
        <th className="w-1/3 text-left px-6 py-3">Role</th>
      </tr>
    </thead>

    <tbody>
      {users.map((u) => (
        <tr
          key={u._id}
          className="border-t hover:bg-gray-50 transition"
        >
          <td className="px-6 py-4 text-left align-middle">
            <span className="font-medium text-gray-800">
              {u.name}
            </span>
          </td>

          <td className="px-6 py-4 text-left align-middle">
            <span className="text-gray-500">
              {u.email}
            </span>
          </td>

          <td className="px-6 py-4 text-left align-middle">
            <div className="flex items-center">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${roleStyle(
                  u.role
                )}`}
              >
                {u.role}
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            All Videos
          </h2>

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
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;