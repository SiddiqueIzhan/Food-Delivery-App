import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import Category from "./category";
import TopRest from "./topRest";
import OnlineDelivery from "./OnlineDelivery";

export const apiUrl = import.meta.env.VITE_API_URL;

const Parent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [catResponse, restResponse] = await Promise.all([
          fetch(`${apiUrl}/categories`),
          fetch(`${apiUrl}/top-restaurant-chains`),
        ]);

        const [catData, restData] = await Promise.all([
          catResponse.json(),
          restResponse.json(),
        ]);

        setCategories(catData);
        setRestaurants(restData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen">
      <NavBar showSearch={showSearch} setShowSearch={setShowSearch} />
      <Category categories={categories} />
      <TopRest restaurants={restaurants} />
      <OnlineDelivery
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        restaurants={restaurants}
      />
    </div>
  );
};

export default Parent;
