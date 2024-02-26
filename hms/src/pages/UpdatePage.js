import React from "react";
import Navbar from "../components/navbar/Navbar";
import Update from "../components/update/Update";
import { useParams } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <Update id={id} />
    </div>
  );
};

export default UpdatePage;
