import React, { useState } from "react";

const filterData = [
  {
    filterType: "Location",
    options: ["Borivali", "Bandra", "Vasai", "Bhayandar", "Andheri", "Malad","Kandivali","Mira Road","Goregaon"],
  },
 
  {
    filterType: "Price",
    options: ["500-1000", "1000-1500"],
  },
];

const SportsListFilter = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Sports: "",
    Price: "",
  });

  const [activeTab, setActiveTab] = useState(null); // For mobile tabs

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetState = { Location: "", Sports: "", Price: "" };
    setSelectedFilters(resetState);
    onFilterChange(resetState);
  };

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block p-4 pr-12 border-r border-gray-300 fixed top-0 h-full overflow-y-auto ">
        <h1 className="text-2xl font-bold text-[#31a022] mb-4 mt-20">
          Filter Turfs
        </h1>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold text-[#31a022]">
              {data.filterType}
            </h2>
            {data.options.map((item, optionIndex) => (
              <div key={optionIndex} className="flex items-center mt-1.5">
                <input
                  type="radio"
                  id={`${data.filterType}-${item}`}
                  name={data.filterType}
                  value={item}
                  onChange={() => handleFilterChange(data.filterType, item)}
                  checked={selectedFilters[data.filterType] === item}
                  className="mr-2"
                />
                <label htmlFor={`${data.filterType}-${item}`}>{item}</label>
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={resetFilters}
          className="w-full bg-[#31a022] text-white py-2 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex justify-around border-b">
          {filterData.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(activeTab === index ? null : index)}
              className={`px-4 py-2 ${
                activeTab === index ? "border-b-2 border-[#31a022]" : ""
              }`}
            >
              {filter.filterType}
            </button>
          ))}
        </div>

        {filterData.map((filter, index) => (
          <div
            key={index}
            className={`absolute z-10 bg-white border rounded shadow-lg w-full px-4 py-2 transition-all ${
              activeTab === index ? "block" : "hidden"
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
                  className="mr-2"
                />
                <label htmlFor={`${filter.filterType}-${optionIndex}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}

        <div className="p-4">
          <button
            onClick={resetFilters}
            className="w-full bg-[#31a022] text-white py-2 rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default SportsListFilter;
