import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comment: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentsData: (state, action) => {
      state.comment = action.payload;
      console.log("slice" , action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { commentsData } = commentSlice.actions;

export default commentSlice.reducer;
