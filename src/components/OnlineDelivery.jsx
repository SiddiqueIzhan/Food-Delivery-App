import React, { useEffect, useReducer, useRef, useState } from "react";
import Card from "./card";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import SortPopUp from "./sortPopUp";

const initFilters = [
  { text: "Ratings 4.5+", filterKey: "rating" },
  { text: "Offers", filterKey: "offers" },
  { text: "Rs.100 - Rs.200", filterKey: "priceRange1" },
  { text: "> Rs.200", filterKey: "priceRange2" },
];

const initialSortOptions = [
  {
    label: "Relevance (Default)",
    sortKey: "default",
    status: true,
  },
  {
    label: "Delivery Time",
    sortKey: "minTime",
    status: false,
  },
  {
    label: "Rating",
    sortKey: "rating",
    status: false,
  },
  {
    label: "Cost: Low to High",
    sortKey: "priceLowToHigh",
    status: false,
  },
  {
    label: "Cost: High to Low",
    sortKey: "priceHighToLow",
    status: false,
  },
];

const initialState = {
  selectedFilters: [],
  searchQuery: "",
  selectedSort: "default",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FILTER":
      const isAlreadySelected = state.selectedFilters.includes(
        action.filterKey
      );
      return {
        ...state,
        selectedFilters: isAlreadySelected
          ? state.selectedFilters.filter((key) => key !== action.filterKey)
          : [...state.selectedFilters, action.filterKey],
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query };
    case "SET_SORT":
      return { ...state, selectedSort: action.sort };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
};

const OnlineDelivery = ({ showSearch, setShowSearch, restaurants }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const componentRef = useRef();
  const [isAtTop, setIsAtTop] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [sortOptions, setSortOptions] = useState(initialSortOptions);
  const handleSelection = (selectedIndex) => {
    const updatedOptions = sortOptions.map((option, index) => ({
      ...option,
      status: index === selectedIndex,
    }));
    setSortOptions(updatedOptions);
  };

  const handleApply = () => {
    const SelectedSort = sortOptions.find((elem) => {
      return elem.status === true;
    });
    dispatch({ type: "SET_SORT", sort: SelectedSort.sortKey });
    // Logic to apply the selected option can go here
    setShowOptions(false);
  };

  const handleCloseSearch = () => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      query: "",
    });
    setShowSearch(false);
  };

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

  useEffect(() => {
    let updatedData = [...restaurants];

    // Apply selected filters
    state.selectedFilters.forEach((filterKey) => {
      if (filterKey === "rating") {
        updatedData = updatedData.filter((item) => item.rating >= 4.5);
      } else if (filterKey === "offers") {
        updatedData = updatedData.filter((item) =>
          item.offer?.toUpperCase().includes("OFF")
        );
      } else if (filterKey === "priceRange1") {
        updatedData = updatedData.filter(
          (item) => item.price >= 100 && item.price < 200
        );
      } else if (filterKey === "priceRange2") {
        updatedData = updatedData.filter((item) => item.price >= 200);
      }
    });

    // Apply search query
    if (state.searchQuery) {
      updatedData = updatedData.filter((item) =>
        item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
    //Apply Selected Sort
    if (state.selectedSort) {
      updatedData.sort((a, b) => {
        if (state.selectedSort === "priceLowToHigh") {
          return a.price - b.price;
        } else if (state.selectedSort === "priceHighToLow") {
          return b.price - a.price;
        } else if (state.selectedSort === "rating") {
          return b.rating - a.rating;
        } else if (state.selectedSort === "minTime") {
          return a.minTime - b.minTime;
        } else {
          return 0;
        }
      });
    }

    setFilteredData(updatedData);
  }, [state, restaurants]);

  return (
    <>
      <div className="max-w-[100vw] md:max-w-[1200px] md:mx-auto  p-4">
        <div className="flex items-center justify-between" ref={componentRef}>
          <h1 className="text-gray-800 text-sm md:text-2xl font-extrabold mb-2">
            Restaurants with online food delivery in Chhindwara
          </h1>
        </div>
        <div
          className={`${
            isAtTop
              ? `${
                  showSearch ? "h-24" : "h-10"
                } md:h-20 w-[100vw] fixed top-0 left-0 z-[70] bg-white`
              : ""
          }`}
        >
          <div className="w-full md:w-[1175px] mx-auto flex items-center justify-center gap-3 flex-col md:justify-between md:flex-row mt-2 relative">
            {showOptions && (
              <SortPopUp
                sortOptions={sortOptions}
                setShowOptions={setShowOptions}
                handleSelection={handleSelection}
                handleApply={handleApply}
              />
            )}
            <div
              className={`flex w-full gap-2 h-[23.5px] md:h-9 overflow-x-scroll whitespace-nowrap no-scrollbar ${
                !showSearch && "mt-1 md:mt-3"
              } ${
                isAtTop ? "justify-center" : ""
              } md:justify-start md:relative`}
            >
              <span
                className={`py-1 px-1.5 md:px-3 md:py-1.5 rounded-[18px] shadow-sm text-[9px] md:text-sm border border-gray-300 font-medium cursor-pointer ${"hover:bg-orange-500 hover:text-white"}`}
                onClick={() => setShowOptions(true)}
              >
                Sort By
              </span>
              {initFilters.map((filter) => (
                <span
                  key={filter.text}
                  className={`py-1 px-1.5 md:px-3 md:py-1.5 rounded-[18px] shadow-sm text-[9px] md:text-sm border border-gray-300 font-medium cursor-pointer ${
                    state.selectedFilters.includes(filter.filterKey) &&
                    "bg-black text-white"
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_FILTER",
                      filterKey: filter.filterKey,
                    })
                  }
                >
                  {filter.text}
                </span>
              ))}
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div
                className={`w-[200px] md:min-w-[500px] p-2 md:p-4 bg-gray-100 rounded-xl flex items-center justify-between mr-4 ${
                  isAtTop ? "" : "fixed top-2 right-7 z-50 md:right-[167.5px]"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search for restaurant and food"
                  className={`w-full outline-none bg-transparent text-[9px] md:text-lg`}
                  value={state.searchQuery}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SEARCH_QUERY",
                      query: e.target.value,
                    })
                  }
                />
                <IoMdClose onClick={handleCloseSearch} className="md:text-xl" />
              </div>
            )}
          </div>
        </div>

        <div
          className={`w-full h-[90vh] ${
            filteredData.length
              ? "grid grid-cols-2 md:grid-cols-4 auto-rows-max"
              : "flex items-center justify-center"
          } ${isAtTop ? "mt-16 md:mt-20" : "mt-5"} gap-4 md:gap-6`}
        >
          {filteredData.length ? (
            <>
              {filteredData.map((cat, index) => (
                <Card key={index} cat={cat} show={true} topSect={false} />
              ))}
            </>
          ) : (
            <div className="w-[30vh] h-[40vh] flex flex-col items-center gap-3">
              <img src="\images\cancel.png" alt="not-found" className="w-1/2" />
              <span className="text-black-500 text-xl text-center font-extrabold">
                Items Not Found
              </span>
            </div>
          )}
        </div>

        <hr className="w-full mt-2.5 md:mt-5" />
      </div>
    </>
  );
};

export default OnlineDelivery;
