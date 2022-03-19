import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "../../redux/features/Images/images";
// import ImageGrid from "../layout/ImageGrid";
import { debounce } from "lodash";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImgCard from "../layout/ImgCard";

const Homepage = () => {
  const TOTAL_PAGES = 25;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.images);
  const loading = useSelector((state) => state.images.loading);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const changePageNo = (value) => {
    setPageNum(value);
  };

  const observer = useRef(
    new IntersectionObserver((entries) => {
      console.log(entries);
      const first = entries[0];
      if (first.isIntersecting && first.intersectionRatio !== 1) {
        changePageNo((no) => no + 1);
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

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      console.log("ran");
      const debouncedFunc = debounce(() => dispatch(getImages(pageNum)), 100);
      debouncedFunc();
      // dispatch(getImages(pageNum));
    }
  }, [pageNum]);

  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="w-full min-h-screen p-2 mt-8 ">
        <ToastContainer />
        {/* grid */}

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {data.Imgs.map((el, i) => {
              return i === data.Imgs.length - 1 &&
                !loading &&
                TOTAL_PAGES <= 25 ? (
                <ImgCard card_data={el} ref={setLastElement} key={i - 1} />
              ) : (
                <ImgCard card_data={el} key={i - 1} />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
};

export default Homepage;
