import React from "react";
import profile from "../../images/profile_user.jpeg";

const EditProfile = () => {
  return (
    <div className="min-h-screen px-8 pt-4 pb-10 mx-2 my-4 shadow-xl shadow-gray-400 rounded-3xl">
      <div className="flex flex-wrap justify-center w-full gap-10 heading">
        <div className="font-mono text-4xl">Edit Profile</div>
      </div>
      <div className="flex justify-center w-full h-40 mt-24 rounded-full img_container">
        <img
          src={profile}
          alt=""
          className="w-40 h-full border-2 rounded-full shadow-xl"
        />
      </div>
      <div className="flex flex-wrap w-full gap-2 pb-8 change_pp mt-11">
        <div className="flex justify-center w-full text-xl text-stone-700 d_name">
          <label className="file_upload">
            <input type="file" accept="image/png, image/jpeg" />
            Change Profile Picture
          </label>
        </div>
        <div className="flex justify-center w-full text-sm username text-stone-500">
          <input
            type="text"
            placeholder="Change Username"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
