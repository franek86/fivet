import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUserIds: [],
  activeUserCount: 0,
};

const realtimeSlice = createSlice({
  name: "realtime",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUserIds = action.payload.userIds;
      state.activeUserCount = action.payload.count;
    },
    clearOnlineUsers(state) {
      state.onlineUserIds = [];
      state.activeUserCount = 0;
    },
  },
});

export const { setOnlineUsers, clearOnlineUsers, activeUserCount } = realtimeSlice.actions;
export default realtimeSlice.reducer;
