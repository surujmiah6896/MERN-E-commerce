import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
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
      console.log("send require", err);

      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );

      return response.data;
    } catch (err) {
      console.log("send require", err);

      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
      return response.data;
    } catch (err) {
      console.log("send require", err);

      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (err) {
      console.log("send require", err);

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
        builder
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.error?.message;
          })
          .addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(fetchCartItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.error?.message;
          })
          .addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(updateCartQuantity.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.error?.message;
          }) 
          .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.error?.message;
          });
    }
});


export default shoppingCartSlice.reducer;