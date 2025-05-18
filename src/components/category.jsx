import React, { useEffect, useState } from "react";
import { apiUrl } from "./card";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [slide, setSlide] = useState(0);
  const [itemWidth, setItemWidth] = useState(144); // Default for desktop

  // Update item width based on screen size
  const updateItemWidth = () => {
    if (window.innerWidth < 768) {
      setItemWidth(30.4); // Smaller width for mobile
    } else {
      setItemWidth(9.4); // Default width for larger screens
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev < 12 ? prev + 3 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`);
      const data = await response.json();
      setCategory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    updateItemWidth(); // Set initial item width
    window.addEventListener("resize", updateItemWidth); // Update on window resize
    return () => window.removeEventListener("resize", updateItemWidth);
  }, []);

  return (
    <div className="max-w-[100vw] md:max-w-[1200px] md:mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800 text-sm md:text-2xl font-extrabold">
          What's on your mind?
        </h1>
      </div>
      <div className="w-full h-[102.5px] md:h-[180px] flex overflow-hidden mt-5 relative z-10">
        {category.map((cat) => (
          <div
            key={cat.path}
            className={`w-1/4 md:w-[144px] shrink-0 
            ease-out`}
            style={{
              transform: `translateX(${-itemWidth * slide}vw)`,
            }}
          >
            <img src={`${apiUrl}/images/${cat.image}`} alt="food" />
          </div>
        ))}
      </div>
      <hr className="w-full mt-2.5 md:mt-5" />
    </div>
  );
};

export default Category;
