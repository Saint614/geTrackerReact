import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { itemsReducer } from "../features/items/itemsSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
