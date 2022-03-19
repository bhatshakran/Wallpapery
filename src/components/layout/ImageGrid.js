import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import Masonry from "react-masonry-css";
import "./Grid.css";
import ImgCard from "./ImgCard";

const ImageGrid = ({ data, change, no }) => {
  const loading = useSelector((state) => state.images.loading);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      console.log(entries);
      const first = entries[0];
      if (first.isIntersecting) {
        change((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

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
    return (
      // <Masonry
      //   breakpointCols={breakpointColumnsObj}
      //   className="my-masonry-grid"
      //   columnClassName="my-masonry-grid_column"
      // >
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {data.Imgs.map((el, i) => {
          return i === data.Imgs.length - 1 && !loading && no <= 25 ? (
            <ImgCard card_data={el} ref={setLastElement} key={i - 1} />
          ) : (
            <ImgCard card_data={el} key={i - 1} />
          );
        })}
      </div>
      // </Masonry>
    );
  }
};

export default ImageGrid;
