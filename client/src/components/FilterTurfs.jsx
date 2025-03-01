import React, { useState } from "react";

const filterData = [
  {
    filterType: "Location",
    options: [
      "Borivali",
      "Bandra",
      "Vasai",
      "Bhayandar",
      "Andheri",
      "Malad",
      "Kandivali",
      "Mira Road",
      "Goregaon",
    ],
  },
  {
    filterType: "Sports",
    options: ["Badminton", "Cricket", "Football"],
  },
  {
    filterType: "Price",
    options: ["500-1000", "1000-1500"],
  },
];

const FilterTurfs = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Sports: "",
    Price: "",
  });

  const [activeTab, setActiveTab] = useState(null);

  const handleFilterChange = (filterType, value) => {
    let updatedValue = value;
    // Convert sports value to lowercase to match backend storage format
    if (filterType === "Sports" && value) {
      updatedValue = value.toLowerCase();
    }
    const updatedFilters = { ...selectedFilters, [filterType]: updatedValue };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetState = { Location: "", Sports: "", Price: "" };
    setSelectedFilters(resetState);
    onFilterChange(resetState);
  };

  return (
    <div className="mt-16">
      {/* Desktop Filters */}
      <div className=" hidden lg:block p-4 border-r border-gray-200 fixed top-[64px] h-[calc(100vh-64px)] overflow-y-auto w-[200px] bg-white shadow-lg z-10">
        <h1 className="text-xl font-bold text-[#31a022] mb-6 mt-4">
          Filter Turfs
        </h1>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold text-[#31a022] mb-2">
              {data.filterType}
            </h2>
            {data.options.map((item, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`${data.filterType}-${item}`}
                  name={data.filterType}
                  value={item}
                  onChange={() => handleFilterChange(data.filterType, item)}
                  checked={data.filterType === "Sports" 
                    ? selectedFilters[data.filterType] === item.toLowerCase()
                    : selectedFilters[data.filterType] === item}
                  className="form-radio h-4 w-4 text-[#31a022]"
                />
                <label
                  htmlFor={`${data.filterType}-${item}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={resetFilters}
          className="w-full bg-[#31a022] text-white py-2 px-4 rounded-md hover:bg-[#268a1a] transition duration-300"
        >
          Reset Filters
        </button>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex justify-around border-b border-gray-200 bg-white sticky top-0 z-10">
          {filterData.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(activeTab === index ? null : index)}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === index
                  ? "text-[#31a022] border-b-2 border-[#31a022]"
                  : "text-gray-600 hover:text-[#31a022]"
              } transition duration-300 ease-in-out`}
            >
              {filter.filterType}
            </button>
          ))}
        </div>

        {filterData.map((filter, index) => (
          <div
            key={index}
            className={`absolute z-20 bg-white border border-gray-200 rounded-b-lg shadow-lg w-full px-4 py-3 transition-all duration-300 ease-in-out ${
              activeTab === index
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
          >
            {filter.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`${filter.filterType}-${optionIndex}`}
                  value={option}
                  onChange={() => handleFilterChange(filter.filterType, option)}
                  checked={selectedFilters[filter.filterType] === option}
                  className="form-checkbox h-4 w-4 text-[#31a022] transition duration-150 ease-in-out"
                />
                <label
                  htmlFor={`${filter.filterType}-${optionIndex}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}

        <div className="p-4 bg-white sticky bottom-0 border-t border-gray-200">
          <button
            onClick={resetFilters}
            className="w-full bg-[#31a022] text-white py-2 px-4 rounded-md hover:bg-[#268a1a] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#31a022] focus:ring-opacity-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterTurfs;
