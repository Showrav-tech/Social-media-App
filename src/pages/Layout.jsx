import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

const Layout = () => {
  const { user, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoaded) return <Loading />;

  if (!user) return <Loading />;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 sm:ml-60 xl:ml-72 overflow-y-auto">
        <Outlet />
      </div>

      {/* Mobile Menu Button */}
      {sidebarOpen ? (
        <X
          onClick={() => setSidebarOpen(false)}
          className="sm:hidden fixed top-4 right-4 z-[100]
          w-10 h-10 p-2 bg-white rounded-md shadow cursor-pointer"
        />
      ) : (
        <Menu
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden fixed top-4 right-4 z-[100]
          w-10 h-10 p-2 bg-white rounded-md shadow cursor-pointer"
        />
      )}
    </div>
  );
};

export default Layout;

