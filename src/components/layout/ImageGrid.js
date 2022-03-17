import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ImgCard from "./ImgCard";
import Masonry from "react-masonry-css";
import "./Grid.css";

const ImageGrid = ({ data, change, no }) => {
  const loading = useSelector((state) => state.images.loading);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
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
        {data.Imgs.map((el, i) => {
          return i === data.Imgs.length - 1 && !loading ? (
            <div ref={setLastElement} key={i - 1}>
              <ImgCard card_data={el} />
            </div>
          ) : (
            <ImgCard card_data={el} key={i - 1} />
          );
        })}
      </Masonry>
    );
  }
};

export default ImageGrid;
