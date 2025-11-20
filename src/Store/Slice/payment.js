import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPayment: "false",
  Paymentitem: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    //cart open and close
    paymentCart(state, action) {},

    //item add
    paymentaddItem(state, action) {},

    //item remove
    paymentremoveItem(state, action) {},

    //con increse
    paymentincrementItem(state, action) {},

    //con decrese
    paymentdecrementItem(state, action) {},
  },
});

export const {
  paymentCart,
  paymentaddItem,
  paymentremoveItem,
  paymentincrementItem,
  paymentdecrementItem,
} = paymentSlice.actions;
export default paymentSlice.reducer;
