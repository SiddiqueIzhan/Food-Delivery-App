import React from "react";
import { MdStars } from "react-icons/md";

export const apiUrl = import.meta.env.VITE_API_URL;

const Card = ({ cat, slide, cardWidth, show }) => {
  const value = slide * cardWidth;
  return (
    <div
      key={cat.path}
      className={`w-full max-w-[156px] md:max-w-[273px] shrink-0 duration-500 
    ease-out`}
      style={{
        transform: show ? "" : `translateX(${value < 1850 ? -value : -1850}px)`,
      }}
    >
      <div className="w-full h-[91px] md:h-[182px] rounded-2xl bg-red-400 relative overflow-hidden">
        <img
          src={`${apiUrl}/images/${cat.image}`}
          alt="rest_image"
          className="object-cover absolute hover:scale-[1.2] duration-500 "
        />
        <div className="w-full h-1/2 flex items-end black-gradient p-2 md:p-3 absolute bottom-0 z-10 ">
          <h2 className="text-white text-xs md:text-[22px] font-extrabold uppercase whitespace-nowrap">
            {cat.offer}
          </h2>
        </div>
      </div>
      <div className="p-1 md:p-3">
        <h3 className="font-bold text-sm md:text-lg text-gray-600">
          {cat.title}
        </h3>
        <div className="flex items-center">
          <MdStars className="text-sm md:text-lg text-green-700 inline" />
          <ul className="text-gray-600 text-xs md:text-base flex gap-2">
            <li>{cat.rating}</li>
            <li>
              {cat.minTime}-{cat.maxTime} mins
            </li>
          </ul>
        </div>
        <p className="text-gray-500 text-xs md:text-base font-extralight">
          {cat.name}
        </p>
        <p className="text-gray-500 text-xs md:text-base font-extralight">
          {cat.place}
        </p>
      </div>
    </div>
  );
};

export default Card;
