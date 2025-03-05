import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modalSlice";
import authReducer from "./slices/authSlice.js";
import profileReducer from "./slices/profileSlice.js";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
