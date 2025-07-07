
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, getProducts } from "../../api/productApi";


const initialState = {
  isLoading: false,
  error: "",
  products: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, {rejectWithValue}) => {
      try {
        const response = await addProduct(formData);
        return response?.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        } else {
          return rejectWithValue({ message: err.message });
        }
      }
    }
);

export const getAllProducts = createAsyncThunk(
  "/product/getAllProducts",
  async (formData = null, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      });
  },
});


export default AdminProductsSlice.reducer;