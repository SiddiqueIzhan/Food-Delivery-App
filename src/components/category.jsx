import React, { useEffect, useState } from "react";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [slide, setSlide] = useState(0);
  const [itemWidth, setItemWidth] = useState(144); // Default for desktop

  // Update item width based on screen size
  const updateItemWidth = () => {
    if (window.innerWidth < 768) {
      setItemWidth(110); // Smaller width for mobile
    } else {
      setItemWidth(144); // Default width for larger screens
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev < 12 ? prev + 3 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories");
      const data = await response.json();
      console.log(data);
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

  useEffect(() => {
    slide < 12
      ? setTimeout(() => {
          setSlide(slide + 3);
        }, 3000)
      : setTimeout(() => {
          setSlide(0);
        }, 3000);
  });

  return (
    <div className="max-w-[100vw] md:max-w-[1200px] md:mx-auto p-4 md:mt-3">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800 text-sm md:text-2xl font-extrabold">
          What's on your mind?
        </h1>
      </div>
      <div className="w-full flex overflow-hidden mt-5 relative z-10">
        {category.map((cat) => (
          <div
            key={cat.path}
            className={`w-1/4 md:w-[144px] shrink-0 
            ease-out`}
            style={{
              transform: `translateX(${-itemWidth * slide}px)`,
            }}
          >
            <img src={`http://localhost:5000/images/${cat.image}`} alt="food" />
          </div>
        ))}
      </div>
      <hr className="w-full mt-2.5 md:mt-5" />
    </div>
  );
};

export default Category;
