import React from "react";
import { useSelector } from "react-redux";
import ImgCard from "./ImgCard";
import Masonry from "react-masonry-css";
import "./Grid.css";

const ImageGrid = ({ data }) => {
  const loading = useSelector((state) => state.images.loading);
  const breakpointColumnsObj = {
    default: 4,
    2000: 3,
    700: 2,
    500: 1,
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.Imgs.map((el) => {
          return <ImgCard card_data={el} key={el.id} />;
        })}
      </Masonry>
    );
  }
};

export default ImageGrid;
