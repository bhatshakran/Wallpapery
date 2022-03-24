import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserFile } from "../../redux/features/auth/auth";
import redsponge from "../../images/red-sponge.png";
import aboutsvg from "../../images/about.svg";
import hobbiessvg from "../../images/biking.svg";

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
      <div className="centerafterlg">
        <h1 className="mt-6 text-center">Profile</h1>
        <div className="w-full h-auto py-2 pb-10 mt-8 flexwrapper md:flex ">
          <div className="p-2 text-center md:text-left panel-l font-vistol md:w-1/2">
            <div className="w-full">
              <img
                src={imgurl}
                alt=""
                className="w-40 h-40 mx-auto rounded-full border-1 md:mx-0"
              />
            </div>
            {/* username div */}
            <div className="flex items-center justify-center gap-4 mt-16 md:justify-start">
              <img src={redsponge} alt="" className="w-12 h-12" />

              <h3 className="m-0 tracking-widest opacity-100">{displayName}</h3>
            </div>
            {/* email */}
            <div>
              <p className="mt-8 opacity-50">{email}</p>
            </div>

            <div className="edit_btn">
              <Link to="/edit_profile">
                <button className="px-4 py-2 mt-8 border border-black">
                  Edit profile
                </button>
              </Link>
            </div>
          </div>
          <div className="p-2 text-white mt-28 md:mt-0 panel-r md:w-1/2">
            {/* info container starts here */}
            <div className="w-full card bg-text-primary">
              <h2 className="text-center font-amazingslab">About</h2>
              <img src={aboutsvg} alt="" className="h-52" />
              <p className="mt-6">
                {additionalData ? additionalData.userFile.about : ""}
              </p>
            </div>
            <div className="w-full mt-6 card bg-card-red">
              <h2 className="text-center font-amazingslab">Hobbies</h2>
              <img src={hobbiessvg} alt="" className="h-52" />
              <p className="mt-6">
                {additionalData ? additionalData.userFile.hobbies : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;
