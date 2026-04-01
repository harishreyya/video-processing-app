import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-900 text-white"
      : "text-gray-600 hover:bg-gray-100";

  return (
    <div className="w-64 bg-white border-r h-screen p-5 flex flex-col">

      <h1 className="text-xl font-bold mb-8">🎬 VideoApp</h1>

      <div className="space-y-2">

        <Link to="/library" className={`block px-4 py-2 rounded-lg ${isActive("/library")}`}>
          Library
        </Link>

        {(user?.role === "editor" || user?.role === "admin") && (
          <Link to="/upload" className={`block px-4 py-2 rounded-lg ${isActive("/upload")}`}>
            Upload
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className={`block px-4 py-2 rounded-lg ${isActive("/admin")}`}>
            Admin Panel
          </Link>
        )}

        {user?.role === "editor" && (
          <Link to="/editor" className={`block px-4 py-2 rounded-lg ${isActive("/editor")}`}>
           Editor Panel
          </Link>
        )}

      </div>

      <div className="mt-auto text-xs text-gray-400">
        Role: {user?.role}
      </div>

    </div>
  );
};

export default Sidebar;