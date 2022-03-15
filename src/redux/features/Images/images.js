import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ImagesClient from "../../../axios";

export const getImages = createAsyncThunk("api/images", async () => {
  try {
    const res = await ImagesClient.get(`photos?per_page=30`);
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
});

// Images Slice

export const ImageSlice = createSlice({
  name: "Images",
  initialState: {
    Imgs: [],
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getImages.fulfilled]: (state, action) => {
      state.Imgs = action.payload.data;
      state.loading = false;
    },
  },
});

export default ImageSlice.reducer;
