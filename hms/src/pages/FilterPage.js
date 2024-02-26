import React from "react";
import Navbar from "../components/navbar/Navbar";
import Filter from "../components/filter/Filter";

const FilterPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{marginTop:"20rem"}}>
        <Filter />
      </div>
    </div>
  );
};

export default FilterPage;
