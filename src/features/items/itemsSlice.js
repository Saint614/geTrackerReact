import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    return Promise.reject("Unable to fetch, status: " + response.status);
  }
  const data = await response.json();
  const filteredData = data.filter((el) => el.value >= 5000000);
  return filteredData;
});

const initialState = {
  itemsArray: [],
  isLoading: true,
  errMsg: "",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = "";
        state.itemsArray = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error.message || "Fetch failed";
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
export const selectAllItems = (state) => {
  return state.items.itemsArray;
};
