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

// get an image by id
export const getPictureById = createAsyncThunk('/api/getimage', async(id) =>{
try {
  const res = await ImagesClient.get(`photos/${id}`)
  return res.data
} catch (err) {
  console.log(err)
  return err
}
})

// Images Slice

export const ImageSlice = createSlice({
  name: "Images",
  initialState: {
    Imgs: [],
    loading: true,
    img: null,
  },
  reducers: {},
  extraReducers: {
    [getImages.fulfilled]: (state, action) => {
      state.Imgs = action.payload;
      state.loading = false;
    },
    [getPictureById.pending] :(state, action) => {
      state.img = null
      state.loading = true 
    },
    [getPictureById.fulfilled] : (state, action) => {
      state.loading = false;
      state.img = action.payload;
    }
  },
});

export default ImageSlice.reducer;
