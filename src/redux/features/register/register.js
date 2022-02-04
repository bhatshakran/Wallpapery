import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk("/api/users", async (msg) => {
  console.log(msg);
});

// register slice
export const registerSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: {},
    message: "",
  },
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.values;
      state.message = action.payload.msg;
    },
  },
});

export default registerSlice.reducer;
