import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  categoryDetails: null,
  isLoading: true,
  error: "",
};


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





const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
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
            console.log("cet update",action);
            
            state.error = action?.error?.message;
          });
    }
});


export default categorySlice.reducer;
