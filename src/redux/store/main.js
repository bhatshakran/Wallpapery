import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/register";
import loginReducer from "../features/auth/auth";

export default configureStore({
  reducer: {
    users: registerReducer,
    auth: loginReducer,
  },
});

