"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AssetCard from "@/components/AssetCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHead from "@/components/ProfileComponents/ProfileHead";
import Overview from "@/components/ProfileComponents/Overview";
import Portfolio from "@/components/ProfileComponents/Portfolio";
import Activity from "@/components/ProfileComponents/Activity";

export default function Profile() {
  const [data, setData] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);

  const userData = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/user/me");
      setData(response.data.data); // Remove optional chaining for better error handling

      console.log(userData);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast("Error fetching profile data");
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post("/api/user/logout");
  //     toast(response.data.message);
  //     router.push("/login");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //     toast("Error during logout");
  //   }
  // };

  // const fetchPortfolio = async () => {
  //   try {
  //     const response = await axios.get("/api/portfolio"); // Use .get() for clarity
  //     setPortfolioData(response.data.portfolio[0].assets); // Ensure portfolioData is an array
  //   } catch (error) {
  //     console.error("Failed to fetch portfolio:", error);
  //     toast("Error fetching portfolio data");
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  //   fetchPortfolio();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="mt-24 px-6 md:px-20">
      <ProfileHead />

      <div className="mt-4">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="  dark:bg-[#253041] shadow-md">
            <TabsTrigger className="text-base" value="account">
              Overview
            </TabsTrigger>
            <TabsTrigger className="text-base" value="password">
              Portfolio
            </TabsTrigger>
            <TabsTrigger className="text-base" value="activity">
              Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Overview />
          </TabsContent>
          <TabsContent value="password">
            <Portfolio />
          </TabsContent>
          <TabsContent value="activity">
            <Activity />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
