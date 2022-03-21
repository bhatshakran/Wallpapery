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



export const updateAddtionalUserDetails = createAsyncThunk(
  "/api/auth/updateadditionaldetails",
  async (data) => {
    try {
      const { firebase, updatedHobbies, updatedAbout } = data;
      const parameters = { updatedHobbies, updatedAbout };
      const res = await firebase.updateAdditionalUserDetails(parameters);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      return err;
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

// get user data file from firebase
export const getUserFile = createAsyncThunk('/api/getuserfile', async(data) => {
  try {
    const {firebase, uid} = data
    const res = await firebase.getUserDataFile(uid);
    console.log(res)
  } catch (err) {
    console.log(err)
  }

})
// login slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    loading: false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    dp: localStorage.getItem("imgUrl") ? localStorage.getItem("imgUrl") : "",
    additionalUserData: null,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.stsTokenManager.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    [logOutUser.pending]: (state, action) => {
      state.loading = true;
    },
    [logOutUser.fulfilled]: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.loading = false;
      state.user = {};
    },
    [updateUsername.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUsername.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUserPicture.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserPicture.fulfilled]: (state, action) => {
      state.loading = false;
      state.dp = action.payload;
    },
    [getUserFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.additionalUserData = action.payload
    },
    [updateAddtionalUserDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.additionalUserData = action.payload;
    },
  },
});

export default loginSlice.reducer;
