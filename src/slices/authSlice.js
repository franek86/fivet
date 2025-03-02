import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(state);
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isLoading = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.session = null;
      state.isLoading = fasle;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
