import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("/api/auth", async (data) => {
  const { firebase, values } = data;
  try {
    let response = firebase.doSignInWithEmailAndPassword(
      values.email,
      values.password
    );
    return response;
  } catch (err) {
    return err;
  }
});

// login slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: {},
    message: "",
  },
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.message = "User Logged In! Success!";
    },
  },
});

export default loginSlice.reducer;
