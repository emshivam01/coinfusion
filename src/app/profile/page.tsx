"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Profile() {
  const [data, setData] = useState("null");

  const router = useRouter();

  const getProfile = async () => {
    const response = await axios.get("/api/user/me");
    setData(response?.data?.data);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      toast(response?.data?.message);
      router.push("/login");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div className="flex justify-between h-full m-8 p-8 rounded-md border-2 border-[#27272a] ">
        <div className="card border border-[#3a3a3c] p-4 h-64 w-[300px] max-w-md rounded-md">
          <h2 className="text-xl font-semibold">Hello👋 {data?.username}</h2>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#3a3a3c] text-center text-sm font-semibold  p-3 rounded-md  h-10  px-8 hover:bg-[#1e1e2a]"
        >
          Log out{" "}
        </button>
      </div>
    </div>
  );
}
