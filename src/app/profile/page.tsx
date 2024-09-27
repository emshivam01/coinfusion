"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AssetCard from "@/components/AssetCard";
import { useSelector } from "react-redux";

export default function Profile() {
  const [data, setData] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);

  const userData = useSelector((state) => state.user);

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

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("/api/portfolio"); // Use .get() for clarity
      setPortfolioData(response.data.portfolio[0].assets); // Ensure portfolioData is an array
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
      toast("Error fetching portfolio data");
    }
  };

  useEffect(() => {
    getProfile();
    fetchPortfolio();
  }, []);

  return (
    <div>
      <div className="flex justify-between m-8 p-8 rounded-md border-2 border-[#27272a]">
        <div className="card border border-[#3a3a3c] p-4 h-64 rounded-md">
          <h2 className="text-xl font-semibold">
            Hello👋 {data?.username || "User"}
          </h2>
          <div>
            {portfolioData.length > 0 ? (
              portfolioData.map((asset) => {
                // console.log(asset); // Make sure asset is not undefined here
                return <AssetCard {...asset} key={asset.id} />; // Spread the asset object as props
              })
            ) : (
              <p>No assets available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
