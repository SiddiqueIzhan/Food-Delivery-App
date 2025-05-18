import React, { useState } from "react";
import { SiSwiggy } from "react-icons/si";
import { RxCaretDown } from "react-icons/rx";
import { PiSuitcaseSimple } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoIosHelpBuoy } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartSimple } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const NavLinks = [
  {
    id: 1,
    icon: <PiSuitcaseSimple />,
    text: "Swiggy Corporate",
  },
  {
    id: 2,
    icon: <IoSearch />,
    text: "Search",
  },
  {
    id: 3,
    icon: <RiDiscountPercentLine />,
    text: "Offers",
    sup: "NEW",
  },
  {
    id: 4,
    icon: <IoIosHelpBuoy />,
    text: "Help",
  },
  {
    id: 5,
    icon: <FaRegUser />,
    text: "Sign In",
  },
  {
    id: 6,
    icon: <PiShoppingCartSimple />,
    text: "Cart",
  },
];

const NavBar = ({ showSearch, setShowSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleSearch = () => {
    setShowSearch(true);
    setShowMenu(false);
  };
  return (
    <>
      <div
        className="black-overlay w-full h-full fixed duration-700 z-[9999]"
        style={{
          visibility: showMenu ? "visible" : "hidden",
          opacity: showMenu ? 1 : 0,
        }}
        onClick={() => setShowMenu(false)}
      >
        <div
          className="w-[250px] h-full bg-white absolute top-0 right-0 duration-500 p-4"
          style={{ transform: `translateX(${showMenu ? "0%" : "100%"})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <IoMdClose
            className="absolute right-4 top-4 text-lg duration-1000"
            onClick={() => setShowMenu(false)}
            style={{
              transform: `rotateZ(${showMenu ? "270deg" : "-270deg"})`,
            }}
          />
          <ul className="md:hidden flex flex-col gap-[15px] mt-5">
            {NavLinks.map((link) => (
              <li key={link.id}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 flex items-center gap-2.5 duration-500 relative"
                  onClick={() => link.text === "Search" && handleSearch()}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full h-12 md:h-20 shadow-md bg-white py-2 px-4 md:p-4 sticky top-0 z-20">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center">
          <div className="flex gap-[50px] items-center">
            <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-orange-500">
              <SiSwiggy className="text-white text-lg md:text-3xl" />
            </span>
            <div className="hidden md:flex items-center gap-2.5">
              <span className="border-b-[2px] border-b-black font-bold text-gray-800 text-sm pb-0.5">
                Other
              </span>
              <RxCaretDown className="text-2xl text-orange-500" />
            </div>
          </div>
          {!showSearch && (
            <ul className="hidden md:flex gap-[50px]">
              {NavLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-500 flex items-center gap-2.5 duration-500 relative"
                    onClick={() => link.text === "Search" && handleSearch()}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.text}</span>
                    <sup className="absolute text-yellow-500 -right-7 top-1 text-[10px] font-semibold">
                      {link.sup}
                    </sup>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <IoMdMenu
            onClick={() => setShowMenu(true)}
            className="inline md:hidden"
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
