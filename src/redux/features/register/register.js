import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import firebase from "../../../firebase/config";

export const registerUser = createAsyncThunk("/api/users", async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { name, email, password } = values;

  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });

  //   return response;
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
