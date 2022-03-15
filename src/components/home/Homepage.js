import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "../../redux/features/Images/images";
import ImageGrid from "../layout/ImageGrid";

const Homepage = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  useEffect(async () => {
    dispatch(getImages());
  }, []);
  return (
    <div className="w-full min-h-screen p-2 bg-gray-200">
      <ToastContainer />
      <ImageGrid data={images} />
    </div>
  );
};

export default Homepage;
