import React from "react";
import profile from "../../images/profile_user.jpeg";

const Profile = () => {
  return (
    <div className="w-full min-h-screen px-8 pt-4 pb-10 my-4 shadow-xl shadow-gray-400 rounded-3xl ">
      <div className="flex justify-center w-full heading">
        <div className="font-mono text-4xl">Profile</div>
      </div>
      <div className="flex justify-center w-full h-40 mt-24 rounded-full img_container">
        <img
          src={profile}
          alt=""
          className="w-40 h-full border-2 rounded-full shadow-xl"
        />
      </div>
      <div className="flex flex-wrap w-full gap-2 pb-8 border-b-2 border-gray-100 name mt-11">
        <div className="flex justify-center w-full text-xl text-stone-700 d_name">
          <p>Shaqran Bhat</p>
        </div>
        <div className="flex justify-center w-full text-sm username text-stone-500">
          <p>@bhatshakran</p>
        </div>
      </div>
      <div className="flex w-full p-4 mx-4 mt-4 bg-white border-gray-200 shadow-sm h-72 info_container rounded-3xl">
        <div className="flex flex-wrap justify-center w-1/3 pt-4 mr-4 text-gray-500 bg-gray-200 photo_liked rounded-3xl">
          <h1 className="font-mono text-2xl">About</h1>
          <p className="mx-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            maiores provident ipsa soluta cupiditate ex accusantium nisi!
            Corporis, repellendus quae.
          </p>
        </div>
        <div className="flex flex-wrap justify-center w-1/3 pt-4 mr-4 text-gray-500 bg-gray-200 hobbies rounded-3xl">
          <h1 className="font-mono text-2xl">Photos</h1>
        </div>
        <div className="flex flex-wrap justify-center w-1/3 pt-4 mr-4 text-gray-500 bg-gray-200 about rounded-3xl">
          <h1 className="font-mono text-2xl">Hobbies</h1>
          <p className="mx-4 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
            aliquid.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
