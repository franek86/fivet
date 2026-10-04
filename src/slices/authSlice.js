import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: "",
  isAuthenticated: false,
  subscription: "STANDARD",
  resetToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      /* state.user = action.payload.user;
      state.role = action.payload?.role || "USER"; */
      state.subscription = action.payload?.subscription;
      state.isAuthenticated = true;
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
    },
  },
});

export const { setUser, setResetToken } = authSlice.actions;
export default authSlice.reducer;
