import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import Card, { apiUrl } from "./card";

const TopRest = () => {
  const [restData, setRestData] = useState([]);
  const [slide, setSlide] = useState(0);
  const [cardWidth, setCardWidth] = useState(155);
  useEffect(() => {
    // Fetch restaurant data
    const fetchRestData = async () => {
      const response = await fetch(`${apiUrl}/top-restaurant-chains`);
      const data = await response.json();
      setRestData(data);
    };
    fetchRestData();
  }, []);

  useEffect(() => {
    // Adjust card width based on screen size
    const updateCardWidth = () => {
      const width = window.innerWidth;
      setCardWidth(width >= 768 ? 273 : 86); // 273px for desktop, 155px for mobile
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  return (
    <div className="max-w-[100vw] md:max-w-[1200px] md:mx-auto px-4 md:p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800 text-sm md:text-2xl font-extrabold">
          Top restaurant chains in Chhindwara
        </h1>
        <div className="md:flex gap-4 hidden">
          <div className="rounded-full bg-gray-300 p-2 md:p-3">
            <FaArrowLeft
              className=" text-gray-800"
              onClick={() =>
                slide > 0 && setSlide(slide - (cardWidth >= 273 ? 2 : 4))
              }
            />
          </div>
          <div className="rounded-full bg-gray-300 p-2 md:p-3">
            <FaArrowRight
              className=" text-gray-800"
              onClick={() =>
                slide < (cardWidth >= 273 ? 8 : 16) &&
                setSlide(slide + (cardWidth >= 273 ? 2 : 4))
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[187px] md:h-[334px] flex md:overflow-hidden mt-5 relative z-10 gap-4 md:gap-8 overflow-scroll no-scrollbar">
        {restData.map((cat, index) => (
          <Card
            key={index}
            cat={cat}
            slide={slide}
            cardWidth={cardWidth}
            show={false}
            topSect={true}
          />
        ))}
      </div>
      <hr className="w-full mt-2.5 md:mt-5" />
    </div>
  );
};

export default TopRest;
