import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload?.role || "user";
    },
    logoutUser: (state) => {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
