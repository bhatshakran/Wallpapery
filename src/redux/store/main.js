import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import registerReducer from "../features/register/register";
import loginReducer from "../features/auth/auth";
import toast from "../features/toast/toast";
import images from "../features/Images/images";

export default configureStore({
  reducer: {
    users: registerReducer,
    auth: loginReducer,
    toasts: toast,
    images: images,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
