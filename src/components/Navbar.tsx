"use client";

import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
  };

  return (
    <div className=" m-10 text-2xl font-bold flex justify-between">
      <Link href="/">
        <p className="text-3xl font-bold cursor-pointer">Coinfusion</p>
      </Link>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 border-2 border-gray-500  text-base text-black dark:text-white font-bold rounded-md  hover:bg-gray-300 dark:hover:bg-gray-800"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="px-4 py-2 border-2 border-gray-500  hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-black dark:text-white font-semibold rounded-md ">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
