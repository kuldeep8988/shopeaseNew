
import { createSlice } from "@reduxjs/toolkit";
    
const initialState = {
  isWishlist: false,
  wishItem: [],
};

const cartWish = createSlice({
  name: "wish",
  initialState,
  reducers: {
    togglewish(state, action) {
      state.isWishlist = action.payload;
    },

    wishaddItem(state, action) {
      const newItemId = action.payload.id;
      const existingItem = state.wishItem.find((item) => item.id === newItemId);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.wishItem.push({ ...action.payload, quantity: 1 });
      }
    },

    wishremoveItem(state, action) {
      state.wishItem = state.wishItem.filter(
        (item) => item.id !== action.payload
      );
    },

    wishincrementItem(state, action) {
      state.wishItem = state.wishItem.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
    },

    wishdecrementItem(state, action) {
      state.wishItem = state.wishItem
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: (item.quantity || 1) - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    },
  },
});

export const {
  togglewish,
  wishaddItem,
  wishremoveItem,
  wishincrementItem,
  wishdecrementItem,
} = cartWish.actions;
export default cartWish.reducer;
