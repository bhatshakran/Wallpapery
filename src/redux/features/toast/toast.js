import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// toast slice
export const toastSlice = createSlice({
  name: "toasts",
  initialState: {},
  reducers: {
    popToast: (state, msg) => {
      toast(msg.payload);
    },
  },
  extraReducers: {},
});
export const { popToast } = toastSlice.actions;
export default toastSlice.reducer;
