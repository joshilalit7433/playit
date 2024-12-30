import React, { useState } from "react";

const filterData = [
  {
    filterType: "Location",
    options: ["Borivali", "Bandra", "Vasai", "Bhayandar", "Andheri", "Malad"],
  },
  {
    filterType: "Sports",
    options: ["Badminton", "Cricket", "Football"],
  },
  {
    filterType: "Price",
    options: ["600", "700", "800", "900", "1000", "1200"],
  },
];

const FilterTurfs = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Sports: "",
    Price: "",
  });

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
    <div>
      <h1 className="text-[20px] flex mt-4 justify-center lg:text-2xl font-bold lg:fixed lg:ml-10 lg:mt-2">
        Filter Turfs
      </h1>
      <hr />
      <div className="grid grid-cols-3 ml-8 lg:grid lg:grid-cols-1 lg:ml-10 lg:mt-6 lg:float-left lg:fixed">
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="text-[#31a022]  text-[20px] lg:text-2xl lg:mt-4 mt-4">
              {data.filterType}
            </h1>
            {data.options.map((item, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  value={item}
                  id={item}
                  name={data.filterType}
                  onChange={() => handleFilterChange(data.filterType, item)}
                  checked={selectedFilters[data.filterType] === item}
                />
                <label className="ml-1 lg:text-xl" htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}
          </div>

          




        ))}
      {/* Reset Button */}

      <div className=" lg:mt-2">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-[#31a022] text-white rounded "
        >
          Reset Filters
        </button>
      </div>

      </div>

      
    </div>
  );
};

export default FilterTurfs;
