import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const userdetails = useSelector((state) => state.auth.user);
  const imgurl = useSelector((state) => state.auth.dp);
  const { displayName, email, phoneNumber, photoURL } = userdetails;

  return (
    <div className="h-auto px-8 pt-16 pb-10 mx-2 my-4 ">
      <div className="flex flex-wrap items-center justify-center w-full gap-10 heading">
        <h1 className="">Profile</h1>
        <div className="edit_btn">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-sm">
            <Link to="/edit_profile">Edit profile</Link>
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full h-40 mt-24 rounded-full img_container">
        <img
          src={imgurl}
          alt=""
          className="w-40 h-full border-2 rounded-full shadow-xl"
        />
      </div>
      <div className="flex flex-wrap w-full gap-2 pb-8 border-b-2 border-gray-100 name mt-11">
        <div className="flex justify-center w-full text-xl text-stone-700 d_name">
          <h3>{displayName}</h3>
        </div>
        <div className="flex justify-center w-full username text-stone-500">
          <h4>{email}</h4>
        </div>
      </div>
      {/* info container starts here */}
      <div className="flex flex-wrap h-auto p-4 mx-4 mt-4 lg:flex-nowrap gap-x-14 info_container rounded-3xl">
        <div className="flex flex-wrap w-full text-gray-500 lg:mr-2 lg:w-1/3 about rounded-3xl">
          <h2 className="">About</h2>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            maiores provident ipsa soluta cupiditate ex accusantium nisi!
            Corporis, repellendus quae.
          </p>
        </div>
        <div className="flex flex-wrap w-full h-full text-gray-500 lg:mr-2 lg:w-1/3 hobbies rounded-3xl">
          <h2 className="">Photos</h2>
        </div>
        <div className="flex flex-wrap w-full text-gray-500 lg:w-1/3 photo_liked rounded-3xl">
          <h2 className="">Hobbies</h2>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            accusantium qui ex?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
