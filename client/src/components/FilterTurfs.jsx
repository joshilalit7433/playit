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
    <>
      <h1 className=" text-[20px] flex mt-4 justify-center lg:text-2xl  font-bold lg:fixed lg:ml-10 lg:mt-4">
        Filter turfs
      </h1>
      <hr />
      <div className=" grid grid-cols-3  ml-8 lg:grid lg:grid-cols-1 lg:ml-10 lg:mt-6   lg:float-left lg:fixed ">
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className=" text-[20px] lg:text-2xl lg:mt-6 mt-4   ">
              {data.filterType}
            </h1>
            {data.options.map((item, optionIndex) => {
              return (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    value={item}
                    id={item}
                    name={data.filterType}
                  ></input>
                  <label className=" ml-1  lg:text-xl" htmlFor={item}>
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterTurfs;
