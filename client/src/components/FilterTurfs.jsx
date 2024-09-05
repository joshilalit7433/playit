import React from "react";

const filterData = [
  {
    filterType: "Location",
    options: ["Borivali", "Bandra", "Vasai", "Bhanyendar"],
  },
  {
    filterType: "Sports",
    options: ["Badminton", "Cricket", "Football"],
  },
  {
    filterType: "Price",
    options: ["600", "800", "1000", "1200"],
  },
];

const FilterTurfs = () => {
  return (
    <div className="lg:ml-10 lg:mt-6">
      <h1 className="lg:text-2xl lg:mb-[5px] lg:font-bold">Filter turfs</h1>
      <hr />
      {filterData.map((data, index) => (
        <div key={index}>
          <h1 className="lg:text-2xl lg:mt-4">{data.filterType}</h1>
          {data.options.map((item, optionIndex) => {
            return (
              <div key={optionIndex}>
                <input
                  type="radio"
                  value={item}
                  id={item}
                  name={data.filterType}
                ></input>
                <label className="lg:text-xl" htmlFor={item}>
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterTurfs;
