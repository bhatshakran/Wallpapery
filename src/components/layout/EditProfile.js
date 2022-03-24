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
import editprofilesvg from "../../images/editprofile.svg";

const EditProfile = ({ firebase }) => {
  const details = useSelector((state) => state.auth);
  const imgurl = useSelector((state) => state.auth.dp);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const { uid } = user;
  const dispatch = useDispatch();
  const { displayName } = details.user;
  let additionalData = useSelector((state) => state.auth.additionalUserData);

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
      <div className="centerafterlg ">
        <h1 className="mt-6 text-center">Edit Profile</h1>

        <div className="w-full h-auto py-2 pb-10 mt-8 flexwrapper md:flex md:gap-x-12">
          {/* left pane */}
          <div className="flex items-center w-full h-auto md:w-1/2 leftpane">
            <img src={editprofilesvg} alt="" className="md:w-96" />
          </div>
          {/* right pane */}
          <div className="px-2 mt-36 rightpane md:w-1/2 md:mt-0">
            <img
              src={imgurl}
              alt=""
              className="w-40 h-40 mx-auto rounded-full "
            />

            <div className="mb-5 change_pp mt-11">
              <label className="file_upload text-md">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImgChange}
                />
                Change Profile Picture
              </label>
            </div>
            <div className="w-full username ">
              <label htmlFor="username" className="formlabel">
                Username:
              </label>
              <input
                type="text"
                placeholder="Edit Username"
                className="form-control"
                onChange={handleNameChange}
                defaultValue={displayName ? displayName : "NO username"}
              />
            </div>

            <div className="w-full mt-6 hobbies">
              <label htmlFor="hobbies" className="formlabel">
                Hobbies:
              </label>
              <input
                type="text"
                onChange={handleHobbiesChange}
                placeholder="Edit Hobbies"
                className="form-control"
                defaultValue={
                  additionalData ? additionalData.userFile.hobbies : ""
                }
              />
            </div>
            <div className="w-full mt-6 about">
              <label htmlFor="about" className="formlabel">
                About:
              </label>
              <textarea
                name=""
                id=""
                rows="2"
                placeholder="Edit About"
                onChange={handleAboutChange}
                defaultValue={
                  additionalData ? additionalData.userFile.about : ""
                }
                className="w-full px-2 text-xl bg-transparent border border-black rounded-sm opacity-75 resize-none focus:outline-none focus:opacity-100 focus:border-2"
              ></textarea>
            </div>
            <div className="mt-12 update_btn">
              <button
                className="px-4 py-2 border border-black font-vistol"
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
