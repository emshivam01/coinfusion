"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", user);
      console.log(response?.data?.message, 25);
      toast.success(response?.data?.message);
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledBtn(false);
    }
  }, [user]);

  return (
    <div className="w-screen h-full md:mt-14 flex justify-center items-center">
      <div className="max-w-md w-[380px] mx-auto rounded-none md:rounded-2xl p-8 border border-[#3b3b41] md:p-8 mb-60 md:mb-0">
        <h1 className="font-bold text-3xl mb-6">Log in</h1>

        <form onSubmit={handleLogin} className="">
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
            } bg-[#486dfb] text-center text-sm font-semibold p-3 rounded-md w-full ${
              disabledBtn ? "hover:bg-[#486dfb]" : "hover:bg-[#3653d1]"
            }`}
            disabled={disabledBtn}
          >
            Log in &rarr;
          </button>
        </form>

        <p className="text-center text-sm font-medium my-3">OR</p>

        <Link href="/signup">
          <button className="bg-[#486dfb] text-center text-sm font-semibold  p-3 rounded-md  w-full hover:bg-[#3653d1]">
            Sign up &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
