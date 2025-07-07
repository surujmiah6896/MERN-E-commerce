
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct } from "../../api/productApi";


const initialState = {
  isLoading: false,
  error: "",
  products: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const response = await addProduct(formData);
    return response?.data;
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
      });
  },
});


export default AdminProductsSlice.reducer;