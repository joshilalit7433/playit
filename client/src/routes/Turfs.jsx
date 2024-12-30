import React, { useState } from "react";
import FilterTurfs from "../components/FilterTurfs";
import Turf from "../components/Turf";

export default function Turfs() {
  const [filters, setFilters] = useState({
    Location: "",
    Sports: "",
    Price: "",
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  return (
    <>
      <FilterTurfs onFilterChange={handleFilterChange} />
      <Turf filters={filters} />
    </>
  );
}
