import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modalSlice";
import authReducer from "./slices/authSlice.js";
import uiReducer from "./slices/uiSlice.js";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

export default store;
