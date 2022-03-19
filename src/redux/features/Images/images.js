import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ImagesClient from "../../../axios";

export const getImages = createAsyncThunk(
  "api/images",
  async (no, thunkAPI) => {
    try {
      const res = await ImagesClient.get(`photos?per_page=10&page=${no}`);

      // get current pics from the store
      const imgs = thunkAPI.getState().images.Imgs;
      const combinedImgs = [...imgs, ...res.data];
      if (no === 1) {
        return res.data;
      } else if (no > 1 && no <= 25) {
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
