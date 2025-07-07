import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProduct } from "../../api/productApi";

const { createSlice } = require("@reduxjs/toolkit");

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
      .addCase(addNewProduct, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct, (state, action) => {
        console.log("addnew product slice action", action);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        console.log("addnew product slice rejected:", action);
        state.isLoading = false;
        state.error = null;
      });
  },
});
