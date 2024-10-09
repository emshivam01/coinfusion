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
  const pathname = usePathname(); // Get the current path
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-60 dark:bg-[#171f2e] dark:bg-opacity-60 my-4 p-6   md:my-0 font-bold flex justify-between border border-transparent backdrop-blur-md">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold cursor-pointer">
          Coinfusion
        </h1>
      </Link>
      <div className="text-[14px] flex items-center space-x-6">
        <Link href="/cryptocurrency">Cryptocurrency</Link>
        <Link href="/watchlist">Watchlist</Link>

        <button
          onClick={toggleTheme}
          className="p-1.5 text-base text-black dark:text-white font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? (
            <Sun className="w-5" size={20} />
          ) : (
            <Moon className="w-5" size={18} />
          )}
        </button>

        {userData.id ? (
          <button
            onClick={handleLogout}
            className="px-2 py-1 md:px-4 md:py-2 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-black dark:text-white font-semibold rounded-md"
          >
            Log out
          </button>
        ) : (
          // Hide login button if on /login or /signup page
          pathname !== "/login" &&
          pathname !== "/signup" && (
            <Link href="/login">
              <button className="px-2 py-1 md:px-3 md:py-1.5 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-[14px] text-black dark:text-white font-semibold rounded-md">
                Log in
              </button>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
