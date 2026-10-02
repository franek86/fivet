import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vessels: "",
  users: "",
  payments: "",
  addressBook: "",
  owners: "",
  blogs: "",
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
    setUsersSearch: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setVesselsSearch, setPaymentsSearch, setAddressBookSearch, setOwnersSearch, setBlogsSearch, setUsersSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
