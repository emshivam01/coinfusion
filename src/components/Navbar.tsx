"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
  };

  return (
    <div className=" m-10 text-2xl font-bold flex justify-between">
      <Link href="/">
        <p className="text-2xl font-bold cursor-pointer">Coinfusion</p>
      </Link>
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 text-sm text-[#fbfcff] font-semibold rounded-md bg-[#486dfb] hover:bg-[#3653d1]">
          Log out
        </button>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 text-sm text-[#fbfcff] font-semibold rounded-md bg-[#486dfb] hover:bg-[#3653d1]"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
