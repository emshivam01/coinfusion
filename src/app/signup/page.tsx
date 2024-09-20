"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", user);
      console.log("Clicked ");
    } catch (error) {
      console.log(error);
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
    <div className="w-screen h-screen  flex justify-center items-center ">
      <div className="max-w-md w-[380px] mx-auto rounded-none md:rounded-2xl p-8 border border-[#27272a] md:p-8 mb-48 md:mb-0">
        <h1 className="font-bold text-3xl mb-6">Sign up</h1>

        <form onSubmit={handleSignup} className="">
          <label className="text-sm ">Username</label>
          <br />
          <input
            className="bg-[#27272a] mt-1 px-4 py-2 mb-2 rounded-md w-full"
            type="text"
            placeholder="walterwhite"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <br />
          <label className="text-sm ">Email</label>
          <br />
          <input
            className="bg-[#27272a] mt-1 px-4 py-2 mb-2 rounded-md w-full"
            type="email"
            placeholder="johndoe@eb.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label className="text-sm ">Password</label>
          <br />
          <input
            className="bg-[#27272a] mt-1 mb-8 px-4 py-2 rounded-md w-full"
            type="password"
            placeholder="••••••••"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="submit"
            className={`${
              disabledBtn ? "cursor-not-allowed" : ""
            } bg-[#18181b] text-center text-sm font-semibold p-3 rounded-md w-full ${
              disabledBtn ? "hover:bg-[#18181b]" : "hover:bg-[#2e2e30]"
            }`}
            disabled={disabledBtn}
          >
            Sign up &rarr;
          </button>
        </form>

        <p className="text-center text-sm font-medium my-3">OR</p>

        <Link href="/login">
          <button className="bg-[#18181b] text-center text-sm font-semibold  p-3 rounded-md  w-full hover:bg-[#1e1e2a]">
            Log in &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
