import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  model: string;
  brand: string;
  image: string;
  size: number;
  isAdded: boolean;
  gender: string;
}

export interface FavoritesState {
  favoritesItems: Product[];
  favoritesQuantity: number;
}

const initialState: FavoritesState = {
  favoritesItems: [],
  favoritesQuantity: 0,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const existedItem = state.favoritesItems.some(
        (item) => item.id === action.payload.id
      );
      if (!existedItem) {
        state.favoritesItems.push({ ...action.payload });
        state.favoritesQuantity += 1;
        action.payload.isAdded = true;
      } else {
        const filteredItems = state.favoritesItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.favoritesItems = filteredItems;
        state.favoritesQuantity -= 1;
        action.payload.isAdded = false;
      }
    },

    removeItem: (state, action: PayloadAction<Product>) => {
      const existedItem = state.favoritesItems.some(
        (item) => item.id === action.payload.id
      );

      if (existedItem) {
        const filteredItems = state.favoritesItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.favoritesItems = filteredItems;
        state.favoritesQuantity -= 1;
      }
    },

    removeAllItems: (state) => {
      state.favoritesItems = [];
      state.favoritesQuantity = 0;
    },
  },
});

export const { addToFavorites, removeItem, removeAllItems } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
