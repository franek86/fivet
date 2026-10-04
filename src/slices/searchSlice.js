import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vessels: "",
  users: "",
  payments: "",
  addressBook: "",
  owners: "",
  blogs: "",
  verifiedBrokers: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setVesselsSearch: (state, action) => {
      state.vessels = action.payload;
    },
    setPaymentsSearch: (state, action) => {
      state.payments = action.payload;
    },
    setAddressBookSearch: (state, action) => {
      state.addressBook = action.payload;
    },
    setOwnersSearch: (state, action) => {
      state.owners = action.payload;
    },
    setBlogsSearch: (state, action) => {
      state.blogs = action.payload;
    },

    setSearch: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    setClearSearch: (state, action) => {
      state[action.payload] = "";
    },
  },
});

export const {
  setSearch,
  setVesselsSearch,
  setPaymentsSearch,
  setAddressBookSearch,
  setOwnersSearch,
  setBlogsSearch,
  setUsersSearch,
  setClearSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
