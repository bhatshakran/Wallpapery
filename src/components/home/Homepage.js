import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "../../redux/features/Images/images";
import ImageGrid from "../layout/ImageGrid";
import { debounce } from "lodash";

const Homepage = () => {
  const TOTAL_PAGES = 25;
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const [pageNum, setPageNum] = useState(1);

  const changePageNo = (value) => {
    setPageNum(value);
  };

  useEffect(async () => {
    if (pageNum <= TOTAL_PAGES) {
      const debouncedFunc = debounce(() => dispatch(getImages(pageNum)), 300);
      debouncedFunc();
    }
  }, [pageNum]);

  return (
    <div className="w-full min-h-screen p-2 mt-8 ">
      <ToastContainer />
      <ImageGrid data={images} change={changePageNo} no={pageNum} />
    </div>
  );
};

export default Homepage;
