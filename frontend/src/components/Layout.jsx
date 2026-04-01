import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout;