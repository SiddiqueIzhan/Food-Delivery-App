import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const SortPopUp = ({
  sortOptions,
  setShowOptions,
  handleSelection,
  handleApply,
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowOptions]);

  return (
    <>
      <div className="black-overlay fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center md:hidden"></div>
      <div
        ref={popupRef}
        className="w-3/4 md:w-[182px] rounded-2xl border-gray-300 border bg-white pt-4 px-4 fixed top-1/4 left-1/6 md:absolute z-50"
      >
        <h3 className="md:hidden text-lg block mb-3">Sort Options</h3>
        <IoMdClose
          className="absolute right-4 top-4 text-lg duration-1000 md:hidden"
          onClick={() => setShowOptions(false)}
        />
        {sortOptions.map((option, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">{option.label}</p>
            <input
              type="radio"
              id={option.label}
              name="sort"
              checked={option.status}
              onChange={() => handleSelection(index)}
              className="h-4 w-4 border-gray-300 rounded-sm"
            />
          </div>
        ))}
        <hr className="w-full absolute left-0" />
        <div
          className="w-full text-orange-600 text-sm font-bold text-center py-4 px-2"
          onClick={handleApply}
        >
          Apply
        </div>
      </div>
    </>
  );
};

export default SortPopUp;
