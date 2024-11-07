import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import commentReducer  from "./commentSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    commentReducer: commentReducer,
  },
});
