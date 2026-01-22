import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUserIds: [],
  activeUserCount: 0,
  notifications: [],
  unReadCount: 0,
};

const realtimeSlice = createSlice({
  name: "realtime",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUserIds = action.payload.userIds;
      state.activeUserCount = action.payload.count;
    },

    addNotification(state, action) {
      state.notifications.unshift(action.payload);
    },
    markNotificationRead(state, action) {
      const id = action.payload;
      const notification = state.notifications.find((n) => n.id === id);
      if (notification) notification.read = true;

      state.unreadCount = state.notifications.filter((n) => !n.read && n.scope === "ADMIN").length;
    },
    clearRealTime(state) {
      return initialState;
    },
  },
});

export const { setOnlineUsers, clearRealTime, activeUserCount, markNotificationRead, addNotification } = realtimeSlice.actions;
export default realtimeSlice.reducer;
