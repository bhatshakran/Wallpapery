import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("/api/auth/login", async (data) => {
  const { firebase, values } = data;
  let response;
  try {
    response = firebase.doSignInWithEmailAndPassword(
      values.email,
      values.password
    );
  } catch (err) {
    return err;
  }
  return response;
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

// update user name only
export const updateUsername = createAsyncThunk(
  "/api/auth/updateusername",
  async (data) => {
    const { updatedName, firebase } = data;
      try {
        const res = firebase.updateUser(updatedName);
        return res;
      } catch (error) {
        console.log(error);
        return error;
      }

  }
);


// update only picture 
export const updateUserPicture = createAsyncThunk('/api/updateuserpicture', async(data) => {
  const {firebase, compressedFile} = data;
try {
  // upload new picture
  const response = await firebase.updateProfilePic(compressedFile);
  // get new picture
  const imgUrl = await firebase.getProfilePicUrl(response.metadata.name);
  localStorage.setItem("imgUrl", imgUrl);
  return imgUrl
} catch (err) {
  console.log(err)
}
})

// login slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    loading: true,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    dp: localStorage.getItem("imgUrl") ? localStorage.getItem("imgUrl") : "",
  },
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.stsTokenManager.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    [logOutUser.fulfilled]: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.loading = false;
      state.user = {};
    },
    [updateUsername.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUserPicture.fulfilled] :(state,action) => {
      state.loading = false;
      state.dp = action.payload
    }
  },
});

export default loginSlice.reducer;
