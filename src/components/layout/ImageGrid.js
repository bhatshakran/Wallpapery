import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import Masonry from "react-masonry-css";
import "./Grid.css";
import ImgCard from "./ImgCard";

const ImageGrid = ({ data, change, no }) => {
  console.log(lastElement);

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    900: 2,
    500: 1,
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
  }
};

export default ImageGrid;
