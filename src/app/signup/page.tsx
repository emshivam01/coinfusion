"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/signup", user);
      toast.success(response?.data?.message);
      router.push("/login");
      console.log(response, 31);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabledBtn(false);
    }
  }, [user]);

  return (
    <div className="w-screen h-full md:mt-14  flex justify-center items-center ">
      <div className="max-w-md w-[380px] mx-auto bg-[#f8f8f8] dark:bg-[#141414] rounded-none md:rounded-2xl p-8  md:p-8 mb-48 md:mb-0 border shadow-xl">
        <h1 className="font-bold text-3xl mb-6">Sign up</h1>

        <form onSubmit={handleSignup} className="">
          <label className="text-sm  font-medium ">Username</label>
          <br />
          <div className="flex items-center mt-1 mb-2 px-3 bg-white  border border-gray-500 dark:border-[#3b3b3b] dark:bg-[#27272a] rounded-md">
            <User size={16} className="" />
            <input
              className=" dark:bg-[#27272a]  px-4 py-2 focus:outline-none rounded-md w-full"
              type="text"
              placeholder="walterwhite"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <label className="text-sm  font-medium">Email</label>
          <br />
          <div className="flex items-center mt-1 mb-2 px-3 bg-white border border-gray-500 dark:border-[#3b3b3b] dark:bg-[#27272a] rounded-md">
            <Mail size={16} className="" />
            <input
              className=" dark:bg-[#27272a]  px-4 py-2 focus:outline-none rounded-md w-full"
              type="email"
              placeholder="johndoe@eb.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <label className="text-sm  font-medium">Password</label>
          <br />
          <div className="flex items-center mt-1 mb-8 px-3 bg-white border border-gray-500 dark:border-[#3b3b3b] dark:bg-[#27272a] rounded-md">
            <Lock size={16} className="" />
            <input
              className=" dark:bg-[#27272a]   px-4 py-2 focus:outline-none rounded-md w-full"
              type="password"
              placeholder="••••••••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`${
              disabledBtn ? "cursor-not-allowed" : ""
            } bg-[#333333] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white  text-center text-sm font-semibold p-3 rounded-md w-full ${
              disabledBtn ? "hover:bg-[#333333]" : "hover:bg-[#4d4d4d]"
            }`}
            disabled={disabledBtn}
          >
            Sign up &rarr;
          </button>
        </form>

        <p className="text-center text-sm font-medium my-3">OR</p>

        <Link href="/login">
          <button className="bg-[#333333] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white  text-center text-sm font-semibold  p-3 rounded-md  w-full hover:bg-[#4d4d4d]">
            Log in &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
