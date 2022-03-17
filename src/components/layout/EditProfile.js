import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePictureAndUsername } from "../../redux/features/auth/auth";
import imageCompression from "browser-image-compression";
import { uploadToFirebaseDB } from "../../redux/features/Images/images";

const EditProfile = ({ firebase }) => {
  const details = useSelector((state) => state.auth);
  const imgurl = useSelector((state) => state.images.uploadDp);
  const dispatch = useDispatch();
  const { displayName } = details.user;
  const [updatedName, setUpdatedName] = useState(null);
  const [myImg, setImg] = useState({});

  const handleChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleImgChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
    console.log("originalFile instanceof Blob", myImg instanceof Blob); // true
    console.log(`originalFile size ${myImg.size / 1024 / 1024} MB`);
  };

  const updatePicAndPassword = async () => {
    // Compress the selected image if the user wants to change the profile picture
    let data, compressedFile;
    (async function () {
      if (myImg) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        try {
          compressedFile = await imageCompression(myImg, options);
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          );
        } catch (err) {
          console.log(err);
        }
      }
      // Upload to firebase rdbms

      const values = { firebase, compressedFile };
      const res = dispatch(uploadToFirebaseDB(values));
      // console.log(res);
    })();

    data = { firebase, updatedName };
    dispatch(updatePictureAndUsername(data));
  };

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
            onClick={updatePicAndPassword}
          >
            Update Profile Picture and Username
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
