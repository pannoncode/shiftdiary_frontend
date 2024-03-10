import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./loginSlice";
import { actualDiarySlice } from "./actualDiary";

export const store = configureStore({
  reducer: {
    logIn: loginSlice.reducer,
    actualDiary: actualDiarySlice.reducer,
  },
});
