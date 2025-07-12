import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  categoryDetails: null,
  isLoading: true,
  error: "",
};


export const createAdminCategories = createAsyncThunk(
  "get/createAdminCategories",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/category/add", formData
    );
    console.log("response", response.data);

    return response.data;
  }
);

export const getAllAdminCategories = createAsyncThunk(
  "get/getAllAdminCategories",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/category/get"
    );
    console.log("response", response.data);

    return response.data;
  }
);


export const editAdminCategories = createAsyncThunk(
  "get/editAdminCategories",
  async ({ id, data }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/category/update/${id}`,
      data
    );

    return response.data;
  }
);

export const deleteAdminCategories = createAsyncThunk(
  "get/deleteAdminCategories",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/category/delete/${id}`
    );

    return response.data;
  }
);




const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
          .addCase(createAdminCategories.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createAdminCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("action", action);

            state.categories = action?.payload?.status
              ? action?.payload?.data
              : [];
          })
          .addCase(createAdminCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.error?.message;
          })
          .addCase(getAllAdminCategories.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllAdminCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("action", action);

            state.categories = action?.payload?.status
              ? action?.payload?.data
              : [];
          })
          .addCase(getAllAdminCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.error?.message;
          })
          .addCase(editAdminCategories.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(editAdminCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("action", action);

            state.categories = action?.payload?.status
              ? action?.payload?.data
              : [];
          })
          .addCase(editAdminCategories.rejected, (state, action) => {
            state.isLoading = false;
            console.log("cet update", action);

            state.error = action?.error?.message;
          })
          .addCase(deleteAdminCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("delete id", action);
            
            // Remove the deleted category from the categories array
            if (action?.payload?.status && action?.payload?.data) {
              state.categories = state.categories.filter(
                (category) => category._id !== action?.payload?.data?._id
              );
            }
          });
    }
});


export default categorySlice.reducer;
