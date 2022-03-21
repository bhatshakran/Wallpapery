import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserFile } from "../../redux/features/auth/auth";

const Profile = ({ firebase }) => {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const { uid } = userdetails;
  const imgurl = useSelector((state) => state.auth.dp);
  const additionalData = useSelector((state) => state.auth.additionalUserData);
  const { displayName, email } = userdetails;

  useEffect(() => {
    let mounted = true;
    const data = { firebase, uid };
    if (mounted) {
      dispatch(getUserFile(data));
    }

    return () => {
      // executed when unmount
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="h-auto px-8 pt-16 pb-10 mx-2 my-4 ">
        <div className="flex flex-wrap items-center justify-center w-full gap-10 heading">
          <h1 className="">Profile</h1>
          <div className="edit_btn">
            <Link to="/edit_profile">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-sm">
                Edit profile
              </button>
            </Link>
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
        <div className="flex flex-wrap h-auto p-4 mx-4 mt-4 lg:flex-nowrap gap-y-16 gap-x-14 info_container rounded-3xl">
          <div className="flex flex-wrap w-full text-gray-500 lg:mr-2 lg:w-1/3 about ">
            <h2 className="">About</h2>
            <p className="">
              {additionalData ? additionalData.userFile.about : ""}
            </p>
          </div>
          <div className="flex flex-wrap w-full h-full text-gray-500 lg:mr-2 lg:w-1/3 hobbies ">
            <h2 className="">Photos</h2>
          </div>
          <div className="flex flex-wrap w-full text-gray-500 lg:mr-2 lg:w-1/3 about ">
            <h2 className="">Hobbies</h2>
            <p className="">
              {additionalData ? additionalData.userFile.hobbies : ""}
            </p>
          </div>
        </div>
      </div>
    );
};

export default Profile;
