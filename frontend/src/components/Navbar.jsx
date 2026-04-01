import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 border-b">

      <h2 className="text-lg font-semibold text-gray-800">
        Welcome, {user?.name}
      </h2>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="text-sm text-gray-700">{user?.email}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;