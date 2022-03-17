import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ImagesClient from "../../../axios";

export const getImages = createAsyncThunk(
  "api/images",
  async (no, thunkAPI) => {
    try {
      const res = await ImagesClient.get(`photos?per_page=5&page=${no}`);

      // get current pics from the store
      const imgs = thunkAPI.getState().images.Imgs;
      const combinedImgs = [...imgs, ...res.data];
      if (imgs.length === 0) {
        return res.data;
      } else {
        return combinedImgs;
      }
    } catch (err) {
      return err;
    }
  }
);

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
      state.Imgs = action.payload;
      state.loading = false;
    },
  },
});

export default ImageSlice.reducer;
