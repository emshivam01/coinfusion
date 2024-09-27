"use client";

import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/slices/userSlice";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userData = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const currentPath = usePathname(); // Get the current path

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      dispatch(clearUser());
      toast(response.data.message);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast("Error during logout");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
  };

  // useEffect(() => {
  //   document.body.classList.add("dark"); // Set dark mode as default on initial load
  // }, []);

  return (
    <div className="m-10 text-2xl font-bold flex justify-between">
      <Link href="/">
        <p className="text-3xl font-bold cursor-pointer">Coinfusion</p>
      </Link>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-1.5  text-base text-black dark:text-white font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={18} />}
        </button>

        {/* Conditionally render the Log in / Log out button */}

        {/* {currentPath !== "/login" && currentPath !== "/signup" && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-black dark:text-white font-semibold rounded-md"
          >
            {userData.id ? "Log out" : "Log in"}
          </button>
        )}

        <Link href="/login">
          <button className="px-4 py-2 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-black dark:text-white font-semibold rounded-md">
            Log in
          </button>
        </Link> */}

        {userData.id ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-black dark:text-white font-semibold rounded-md"
          >
            Log out
          </button>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-black dark:text-white font-semibold rounded-md">
              Log in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
