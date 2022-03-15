import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("/api/auth/login", async (data) => {
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

// log out current user
export const logOutUser = createAsyncThunk(
  "/api/auth/logout",
  async (firebase) => {
    try {
      let response = firebase.logOut();
      return response;
    } catch (error) {
      return error;
    }
  }
);

// login slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: {},
  },
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
    },
    [logOutUser.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false.valueOf;
      state.user = null;
    },
  },
});

export default loginSlice.reducer;
