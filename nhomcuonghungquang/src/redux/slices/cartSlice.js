import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmout: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingITem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;
      if (!existingITem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingITem.quantity++;
        existingITem.totalPrice =
          Number(existingITem.totalPrice) + Number(newItem.price);
      }
      state.totalAmout = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity)
      );
      console.log(state.totalQuantity);
      console.log(state.cartItems);
      console.log(newItem);
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
