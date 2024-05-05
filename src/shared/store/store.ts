import { configureStore } from "@reduxjs/toolkit";
import State from "./reducer";

export const store = configureStore({
  reducer: {
    State,
  },
});
