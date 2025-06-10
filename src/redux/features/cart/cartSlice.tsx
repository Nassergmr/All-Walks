import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  model: string;
  brand: string;
  image: string;
  price: number;
  size: number;
}

interface CartItem extends Product {
  quantity: number;
}
export interface CartState {
  cartItems: CartItem[];
  cartQuantity: number;
}

const initialState: CartState = {
  cartItems: [],
  cartQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (cartItemIndex === -1) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        state.cartItems[cartItemIndex].quantity += 1;
      }
      state.cartQuantity += 1;
    },

    incrementQuantity: (state, action: PayloadAction<Product>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (cartItemIndex !== -1) {
        state.cartItems[cartItemIndex].quantity += 1;
      }
      state.cartQuantity += 1;
    },

    decrementQuantity: (state, action: PayloadAction<Product>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (cartItemIndex !== -1 && state.cartItems[cartItemIndex].quantity > 1) {
        state.cartItems[cartItemIndex].quantity -= 1;
        state.cartQuantity -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<Product>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (cartItemIndex !== -1) {
        const removedQuantity = state.cartItems[cartItemIndex].quantity;
        const filteredItems = state.cartItems.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            )
        );
        state.cartItems = filteredItems;
        state.cartQuantity = state.cartQuantity - removedQuantity;
      }
    },
    removeAllItems: (state) => {
      state.cartItems = [];
      state.cartQuantity = 0;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAllItems,
} = cartSlice.actions;
export default cartSlice.reducer;
