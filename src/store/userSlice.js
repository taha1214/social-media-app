import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("🚀 ~ action:", action);
      state.user = action.payload;
    },
    signup: (state, action) => {
      state.user = true;
    },
    logOut: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    isUserLoggedIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, login, signup, isUserLoggedIn } = userSlice.actions;

export default userSlice.reducer;
