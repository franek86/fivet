import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDropdownOpen: false,
    isDropdownOpenByName: null,
    isToggleNav: null,
    isDrawerOpen: false,
  },
  reducers: {
    setIsDrawerOpen: (state) => {
      state.isDrawerOpen = true;
    },

    setIsDrawerClose: (state) => {
      state.isDrawerOpen = false;
    },

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
    closeNav(state) {
      state.isToggleNav = false;
    },
  },
});
export const {
  isDrawerOpen,
  setIsDrawerClose,
  setIsDrawerOpen,
  openDropdown,
  isDropdownOpenByName,
  isToggleNav,
  closeDropdown,
  closeNav,
  toggleDropdown,
  toggleDropdownByName,
  toggleNav,
} = uiSlice.actions;
export default uiSlice.reducer;
