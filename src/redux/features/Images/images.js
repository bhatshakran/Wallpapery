import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ImagesClient from "../../../axios";

export const getImages = createAsyncThunk("api/images", async () => {
  try {
    const res = await ImagesClient.get(`photos?per_page=20`);
    return res;
  } catch (err) {
    return err;
  }
});

export const uploadToFirebaseDB = createAsyncThunk(
  "api/images/updatedp",
  async (data) => {
    const { firebase, compressedFile } = data;
    try {
      // upload new picture
      const response = await firebase.updateProfilePic(compressedFile);
      // get new picture
      const imgUrl = await firebase.getProfilePicUrl(response.metadata.name);

      return imgUrl;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

// Images Slice

export const ImageSlice = createSlice({
  name: "Images",
  initialState: {
    Imgs: [],
    uploadDp: "",
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getImages.fulfilled]: (state, action) => {
      state.Imgs = action.payload.data;
      state.loading = false;
    },
    [uploadToFirebaseDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.uploadDp = action.payload;
    },
  },
});

export default ImageSlice.reducer;
