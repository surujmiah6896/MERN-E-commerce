import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (err) {
      console.log("send require",err);

      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

const shoppingCartSlice = createSlice({
    name:"shoppingCart",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(addToCart.pending, (state)=>{
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) =>{
          
            state.isLoading = false;
            state.cartItems = action?.payload?.status ? action?.payload?.data : null;
        }).addCase(addToCart.rejected, (state, action)=>{
            state.isLoading = false;
            state.error= action?.payload?.error?.message;
        });
    }
});


export default shoppingCartSlice.reducer;