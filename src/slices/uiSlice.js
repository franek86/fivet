import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDropdownOpen: false,
    isDropdownOpenByName: null,
    isToggleNav: null,
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
    toggleNav: (state) => {
      state.isToggleNav = !state.isToggleNav;
    },
  },
});
export const { openDropdown, isDropdownOpenByName, isToggleNav, closeDropdown, toggleDropdown, toggleDropdownByName, toggleNav } =
  uiSlice.actions;
export default uiSlice.reducer;
