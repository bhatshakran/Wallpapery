import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "../../redux/features/Images/images";
// import ImageGrid from "../layout/ImageGrid";
import { debounce } from "lodash";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImgCard from "./ImgCard";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const TOTAL_PAGES = 25;
  const navigate = useNavigate();
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
      const first = entries[0];
      if (first.isIntersecting && first.intersectionRatio !== 1) {
        changePageNo((no) => no + 1);
      }
    })
  );

  const goToPictureRoute = (id) => {
    navigate(`/pictures/${id}`);
  };

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
    let mounted = true;
    if ((pageNum <= TOTAL_PAGES) & mounted) {
      const debouncedFunc = debounce(() => dispatch(getImages(pageNum)), 100);
      debouncedFunc();
      // dispatch(getImages(pageNum));
    }

    return () => (mounted = false);
  }, [pageNum]);

  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="w-full min-h-screen p-2 mt-8 centerafterlg">
        <ToastContainer />
        {/* grid */}

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {data.Imgs.map((el, i) => {
              return i === data.Imgs.length - 1 &&
                !loading &&
                TOTAL_PAGES <= 25 ? (
                <div key={i - 1} onClick={() => goToPictureRoute(el.id)}>
                  <ImgCard card_data={el} ref={setLastElement} />
                </div>
              ) : (
                <div key={i - 1} onClick={() => goToPictureRoute(el.id)}>
                  <ImgCard card_data={el} />
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
};

export default Explore;
