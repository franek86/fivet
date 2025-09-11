import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDropdownOpen: false,
    isDropdownOpenByName: null,
  },
  reducers: {
    toggleDropdownByName: (state, action) => {
      state.isDropdownOpenByName = state.isDropdownOpenByName === action.payload ? null : action.payload;
    },

    openDropdown: (state) => {
      state.isDropdownOpen = true;
    },
    closeDropdown: (state) => {
      state.isDropdownOpen = false;
    },
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
  },
});
export const { openDropdown, isDropdownOpenByName, closeDropdown, toggleDropdown, toggleDropdownByName } = uiSlice.actions;
export default uiSlice.reducer;
