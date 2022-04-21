import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPictureById } from "../../redux/features/Images/images";
import avatar from "../../images/avatar.png";
import axios from "axios";
import { saveAs } from "file-saver";

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

  const downloadPic = async () => {
    let resA;
    try {
      resA = await axios.get(`${img.links.download_location}`, {
        method: "GET",
        headers: {
          Authorization: `Client-ID 1FypSUlyZgXMpBWT65UFesID7M4A6iyJEzSyKiz_kTI`,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
    try {
      const resB = await axios.get(resA.data.url, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([resB.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "img.png");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <img
          src={img ? img.urls.regular : avatar}
          alt="Image"
          className="w-2/3 max-h-full"
        />
        <button
          className="w-2/3 p-4 mt-8 text-white bg-text-primary"
          onClick={downloadPic}
        >
          Download
        </button>
      </div>
    );
};

export default Picture;
