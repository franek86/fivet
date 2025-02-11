import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isOpenModalName: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalByName: (state, action) => {
      state.isOpenModalName = action.payload;
    },
    closeModalByName: (state) => {
      state.isOpenModalName = null;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { isOpen, openModal, closeModal, toggleModal, openModalByName, closeModalByName } = modalSlice.actions;
export default modalSlice.reducer;
