import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const dispatch = useDispatch();
  const { displayName } = details.user;
  const [updatedName, setUpdatedName] = useState(null);

  const handleChange = (e) => {
    setUpdatedName(e.target.value);
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

  const handleUsernameChange = async () => {
    try {
      const data = { firebase, updatedName };
      dispatch(updateUsername(data));
    } catch (error) {
      console.log(error);
    }
  };

  // Conditional Rendering
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-auto">
        <ClimbingBoxLoader color="navy" loading={loading} css={css} size={15} />
      </div>
    );
  } else
    return (
      <div className="min-h-screen px-8 pt-4 pb-10 mx-2 my-4 shadow-xl shadow-gray-400 rounded-3xl">
        <div className="flex flex-wrap justify-center w-full gap-10 heading">
          <div className="font-mono text-4xl">Edit Profile</div>
        </div>
        <div className="flex justify-center w-full h-40 mt-24 rounded-full img_container">
          <img
            src={imgurl}
            alt=""
            className="w-40 h-full border-2 rounded-full shadow-xl"
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
          <div className="flex justify-center w-full text-sm username text-stone-500">
            <input
              type="text"
              placeholder="Change Username"
              className="form-control"
              onChange={handleChange}
              defaultValue={displayName ? displayName : "NO username"}
            />
          </div>
          <div className="update_btn">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-sm"
              onClick={handleUsernameChange}
            >
              Update Username
            </button>
          </div>
        </div>
      </div>
    );
};

export default EditProfile;
