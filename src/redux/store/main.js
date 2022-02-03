import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/main";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
