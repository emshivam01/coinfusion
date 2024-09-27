"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser as setUserInStore } from "@/redux/slices/userSlice";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", userCredentials);
      const userData = response?.data?.user;
      if (userData) {
        const { _id, username, email } = userData;
        dispatch(setUserInStore({ _id, username, email }));
      } else {
        console.log("Error Dispatching");
      }

      console.log(userData, 28);
      console.log(response?.data?.message, 25);
      toast.success(response?.data?.message);
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (
      userCredentials.email.length > 0 &&
      userCredentials.password.length > 0
    ) {
      setDisabledBtn(false);
    }
  }, [userCredentials]);

  return (
    <div className="w-screen h-full md:mt-14 flex justify-center items-center">
      <div
        className="max-w-md w-[380px] mx-auto
      bg-[#f8f8f8] dark:bg-[#141414]  rounded-none md:rounded-2xl p-8 border  md:p-8 mb-60 md:mb-0 shadow-md"
      >
        <h1 className="font-bold text-3xl mb-6">Log in</h1>

        <form onSubmit={handleLogin} className="">
          <label className="text-sm ">Email</label>
          <br />
          <div className="flex items-center mt-1 mb-8 px-3 bg-white border border-gray-500 dark:border-[#3b3b3b] dark:bg-[#27272a] rounded-md">
            <Mail size={16} className="text-gray-400" />

            <input
              className="dark:bg-[#27272a]  px-4 py-2 focus:outline-none rounded-md w-full"
              type="email"
              placeholder="johndoe@eb.com"
              value={userCredentials.email}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                })
              }
            />
          </div>
          <label className="text-sm ">Password</label>
          <br />

          <div className="flex items-center mt-1 mb-8 px-3 bg-white border border-gray-500 dark:border-[#3b3b3b] dark:bg-[#27272a] rounded-md">
            <Lock size={16} className="text-gray-400" />
            <input
              className="dark:bg-[#27272a] px-4 py-2 focus:outline-none rounded-md w-full"
              type="password"
              placeholder="••••••••"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className={`${
              disabledBtn ? "cursor-not-allowed" : ""
            }  bg-[#333333] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white  text-center text-sm font-semibold p-3 rounded-md w-full ${
              disabledBtn ? "hover:bg-[#333333]" : "hover:bg-[#4d4d4d]"
            }`}
            disabled={disabledBtn}
          >
            Log in &rarr;
          </button>
        </form>

        <p className="text-center text-sm font-medium my-3">OR</p>

        <Link href="/signup">
          <button className="bg-[#333333] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white  text-center text-sm font-semibold  p-3 rounded-md  w-full hover:bg-[#4d4d4d]">
            Sign up &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
