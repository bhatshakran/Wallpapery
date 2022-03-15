import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk("/api/users", async (data) => {
  const { firebase, values } = data;

  try {
    let response = firebase.doCreateUserWithEmailAndPassword(
      values.email,
      values.password
    );
    return response;
  } catch (err) {
    return err;
  }
});

// register slice
export const registerSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: {},
  },
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
    },
  },
});

export default registerSlice.reducer;
