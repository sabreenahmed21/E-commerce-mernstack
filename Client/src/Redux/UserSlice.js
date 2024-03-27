import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
    }
  },
});

export const { signInSuccess , logout} = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export default userSlice.reducer;