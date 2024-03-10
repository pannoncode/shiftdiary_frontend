import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null,
  },
  reducers: {
    getTokenAndStore(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    checkToken(state) {
        const token = localStorage.getItem("token") || null;
        state.token = token
    },
  },
});
