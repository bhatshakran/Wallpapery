import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPictureById } from "../../redux/features/Images/images";
import avatar from "../../images/avatar.png";

const Picture = () => {
  const dispatch = useDispatch();
  const img = useSelector((state) => state.images.img);
  const loading = useSelector((state) => state.images.loading);

  // get the photo as soon as the page loads
  useEffect(() => {
    let mounted = true;
    //  get id
    const urlArr = window.location.pathname.split("/");
    const id = urlArr[urlArr.length - 1];
    if (mounted) dispatch(getPictureById(id));

    return () => (mounted = false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <img
          src={img ? img.urls.regular : avatar}
          alt="Image"
          className="w-2/3 max-h-full"
        />
      </div>
    );
};

export default Picture;
