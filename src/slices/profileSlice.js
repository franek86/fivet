import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatar: "",
  firstName: "",
  lastName: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.avatar = action.payload.avatar;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
