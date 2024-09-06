import React from "react";
import FilterTurfs from "../components/FilterTurfs";
import Turf from "../components/Turf";

export default function Turfs() {
  return (
    <>
      <FilterTurfs />

      <div className=" grid grid-rows-6 grid-cols-1 mt-6 ml-[35px]     lg:grid lg:grid-rows-4 lg:grid-cols-3 lg:ml-[150px]  lg:mt-6">
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
        <Turf />
      </div>
    </>
  );
}
