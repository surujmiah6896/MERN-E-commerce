import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  featureImages: [],
};

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/feature/add`,
      { image }
    );
    return response.data;
  }
);

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/feature/get`
    );

    return response.data;
  }
);

const featureSlice = createSlice({
    name:"featureSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
          .addCase(addFeatureImage.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addFeatureImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImages = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(addFeatureImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.error;
          })
          .addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImages = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(getFeatureImages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.error;
            state.featureImages = [];
          });;
    }
});


export default featureSlice.reducer;