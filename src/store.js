import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modalSlice";
import authReducer from "./slices/authSlice.js";
import uiReducer from "./slices/uiSlice.js";
import searchReducer from "./slices/searchSlice.js";
import notificationReducer from "./slices/notificationSlice.js";
import realtimeReducer from "./slices/realtimeSlice.js";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
    notifications: notificationReducer,
    realtime: realtimeReducer,
  },
});

export default store;
