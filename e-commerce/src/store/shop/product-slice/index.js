import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    products: [],
    productDetails: null,
    error: "",
}

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams = {}, sortParams = "" }, { rejectWithValue }) => {
    try {
       const query = new URLSearchParams({
         ...filterParams,
         ...(sortParams && { sortBy: sortParams }),
       }).toString();


      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );

      console.log('all type filter', result);

      return result?.data;
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

export const fetchProductsWithCategoryId = createAsyncThunk(
  "/products/withCategoryId",
  async (id, { rejectWithValue }) => {
    try {
      
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/category/${id}`
      );

      console.log(result);

      return result?.data;
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


const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) =>{
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action?.payload?.error?.message;
      })
      .addCase(fetchProductsWithCategoryId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsWithCategoryId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(fetchProductsWithCategoryId.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action?.payload?.error?.message;
      });
  }
});


export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;