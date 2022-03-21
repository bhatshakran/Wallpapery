import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFile,
  updateAddtionalUserDetails,
  updateUsername,
  updateUserPicture,
} from "../../redux/features/auth/auth";
import imageCompression from "browser-image-compression";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/react";

const EditProfile = ({ firebase }) => {
  const details = useSelector((state) => state.auth);
  const imgurl = useSelector((state) => state.auth.dp);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const { uid } = user;
  const dispatch = useDispatch();
  const { displayName } = details.user;
  const additionalUserData = useSelector(
    (state) => state.auth.additionalUserData
  );
  const { about, hobbies } = additionalUserData.userFile;

  const [updatedName, setUpdatedName] = useState(null);
  const [updatedHobbies, setupdatedHobbies] = useState(null);
  const [updatedAbout, setupdatedAbout] = useState(null);

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };
  const handleHobbiesChange = (e) => {
    setupdatedHobbies(e.target.value);
  };
  const handleAboutChange = (e) => {
    setupdatedAbout(e.target.value);
  };

  const handleImgChange = (e) => {
    const selectedFile = e.target.files[0];

    console.log("originalFile instanceof Blob", selectedFile instanceof Blob); // true
    console.log(`originalFile size ${selectedFile.size / 1024 / 1024} MB`);

    // update profile pic

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    (async function () {
      try {
        // Compress the selected image if the user wants to change the profile picture
        console.log(selectedFile);
        let compressedFile = await imageCompression(selectedFile, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );

        // dispatch the action
        const data = { firebase, compressedFile };
        dispatch(updateUserPicture(data));
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleUserDetailsChange = async () => {
    try {
      if (updatedName !== null) {
        const data = { firebase, updatedName };
        dispatch(updateUsername(data));
      } else {
        // update other details
        const additionalData = { firebase, updatedHobbies, updatedAbout };
        dispatch(updateAddtionalUserDetails(additionalData));
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  // Conditional Rendering
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-auto">
        <ClimbingBoxLoader color="navy" loading={loading} css={css} size={15} />
      </div>
    );
  } else
    return (
      <div className="h-auto px-8 pt-16 pb-10 mx-2 my-4 ">
        <div className="flex flex-wrap justify-center w-full gap-10 heading">
          <h1>Edit Profile</h1>
        </div>

        <div className="flex flex-wrap justify-between w-full gap-2 mt-20 flex-column lg:flex-nowrap panecontainer">
          {/* left pane */}
          <div className="w-full rounded-sm shadow-sm lg:w-1/2 leftpane">
            <div className="flex justify-center w-full mt-24 rounded-full h-60 img_container">
              <img
                src={imgurl}
                alt=""
                className="h-full border-2 rounded-full shadow-xl w-60"
              />
            </div>
            <div className="flex flex-wrap justify-center w-full gap-2 pb-8 change_pp mt-11">
              <div className="flex justify-center w-full text-stone-700 d_name">
                <label className="file_upload text-md">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImgChange}
                  />
                  Change Profile Picture
                </label>
              </div>
            </div>
          </div>
          {/* right pane */}
          <div className="w-full p-4 rounded-sm shadow-sm lg:w-1/2 rightpane">
            <div className="flex items-baseline w-full text-lg username text-stone-500">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                placeholder="Edit Username"
                className="form-control"
                onChange={handleNameChange}
                defaultValue={displayName ? displayName : "NO username"}
              />
            </div>

            <div className="flex items-baseline w-full text-lg username text-stone-500">
              <label htmlFor="hobbies">Hobbies:</label>
              <input
                type="text"
                onChange={handleHobbiesChange}
                placeholder={hobbies}
                className="form-control"
                defaultValue={hobbies ? hobbies : "Add Hobbies"}
              />
            </div>
            <div className="flex items-center w-full mt-4 text-lg username text-stone-500">
              <label htmlFor="about">About:</label>
              <textarea
                name=""
                id=""
                rows="2"
                placeholder="Edit About"
                onChange={handleAboutChange}
                defaultValue={about ? about : "Add About"}
                className="w-full px-2 ml-2 bg-transparent border-b-2 resize-none focus:outline-none focus:border-blue-400"
              ></textarea>
            </div>
            <div className="mt-12 update_btn">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-sm"
                onClick={handleUserDetailsChange}
              >
                Update Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default EditProfile;
