import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import { FiFilter } from "react-icons/fi";
import { RxCaretDown } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { IoOptionsOutline } from "react-icons/io5";

const Filters = [
  {
    text: "Sort By",
    icon: <RxCaretDown />,
  },
  {
    text: "Ratings 4.5+",
    icon: "",
  },
  {
    text: "Offers",
    icon: "",
  },
  {
    text: "Rs.100 - Rs.200",
    icon: "",
  },
  {
    text: "> Rs. 200",
    icon: "",
  },
];

const OnlineDelivery = () => {
  const [restData, setRestData] = useState([]);
  const componentRef = useRef();
  const [isAtTop, setIsAtTop] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchRestData = async () => {
      const response = await fetch(
        "http://localhost:5000/top-restaurant-chains"
      );
      const data = await response.json();
      setRestData(data);
    };
    fetchRestData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect();
        setIsAtTop(rect.top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="max-w-[100vw] md:max-w-[1200px] md:mx-auto p-4">
        <div className="flex items-center justify-between" ref={componentRef}>
          <h1 className="text-gray-800 text-sm md:text-2xl font-extrabold mb-2">
            Restaurants with online food delivery in Chhindwara
          </h1>
        </div>
        <div
          className={`${
            isAtTop
              ? "h-10 md:h-20 w-[100vw] fixed top-0 left-0 z-[70] bg-white"
              : ""
          }`}
        >
          <div className="w-full md:w-[1175px] mx-auto flex items-center justify-between mt-2 md:mt-3">
            {/* Mobile: Show filter icon when scrolled to top */}
            <div className="md:hidden">
              {isAtTop ? (
                <IoOptionsOutline className="text-lg cursor-pointer ml-4" />
              ) : (
                <div className="flex flex-wrap gap-2 overflow-x-scroll no-scrollbar">
                  {Filters.map((filterName) => (
                    <span
                      key={filterName.text}
                      className="py-1 px-1.5 rounded-[18px] shadow-sm text-[9px] border border-gray-300 font-medium flex items-center gap-[4px] hover:bg-black hover:text-white duration-500 cursor-pointer whitespace-nowrap"
                    >
                      {filterName.text}
                      {filterName.icon && <i>{filterName.icon}</i>}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: Always show all filters */}
            <div className="hidden md:flex w-full flex-nowrap gap-2">
              {Filters.map((filterName) => (
                <span
                  key={filterName.text}
                  className="py-1 px-3 rounded-[18px] shadow-sm text-sm border border-gray-300 font-medium flex items-center gap-[4px] hover:bg-black hover:text-white duration-500 cursor-pointer"
                >
                  {filterName.text}
                  {filterName.icon && <i>{filterName.icon}</i>}
                </span>
              ))}
            </div>

            {/* Search Bar */}
            <div
              className={`w-[200px] md:w-[500px] p-2 md:p-4 bg-gray-100 rounded-xl flex items-center justify-between mr-4 ${
                isAtTop ? "" : "hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Search for restaurant and food"
                className="w-full outline-none bg-transparent text-[9px] md:text-lg"
              />
              <IoSearch className="" />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 mt-5 relative z-10 gap-4 md:gap-8">
          {restData.map((cat, index) => (
            <Card key={index} cat={cat} show={true} />
          ))}
        </div>
        <hr className="w-full mt-2.5 md:mt-5" />
      </div>
    </>
  );
};

export default OnlineDelivery;
