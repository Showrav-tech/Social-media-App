import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, LogOut } from "lucide-react";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import Menuitems from "./Menuitems";

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0 z-30
        w-60 xl:w-72 bg-white border-r
        flex flex-col justify-between
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
      `}
    >
      {/* Top */}
      <div>
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="w-28 ml-7 my-5 cursor-pointer"
        />

        <hr className="mb-6" />

        <Menuitems setSidebarOpen={setSidebarOpen} />

        <Link
          to="/create-post"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6
          rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-600 hover:to-purple-700 text-white transition"
        >
          <PlusCircle size={20} />
          Create Post
        </Link>
      </div>

      {/* User */}
      <div className="border-t p-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserButton />
          <div>
            <p className="text-sm font-medium">{user?.fullName}</p>
            <p className="text-xs text-gray-500">
              @{user?.username || user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <LogOut
          onClick={signOut}
          className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-700"
        />
      </div>
    </aside>
  );
};

export default Sidebar;



