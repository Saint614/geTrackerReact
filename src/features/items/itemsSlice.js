import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (value, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch, status: " + response.status);
      }
      const data = await response.json();
      const filteredData = data.filter((el) => el.name.toLowerCase() === value);
      if (filteredData.length === 0) {
        return rejectWithValue("This is not a valid Item.");
      }
      return filteredData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  itemsArray: [],
  isLoading: true,
  errMsg: "",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsOrderedByName: (state) => {
      state.itemsArray.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    },
    itemsOrderedByValue: (state) => {
      state.itemsArray.sort((a, b) => a.value - b.value);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.errMsg = "";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = "";
        const newItems = action.payload.filter(
          (item) =>
            !state.itemsArray.some(
              (existingItem) => existingItem.id === item.id
            )
        );
        state.itemsArray = [...state.itemsArray, ...newItems];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.payload || "Fetch failed";
      });
  },
});

export const { itemsOrderedByName, itemsOrderedByValue } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
export const selectAllItems = (state) => {
  return state.items.itemsArray;
};

export const selectItemsError = (state) => state.items.errMsg;
