import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  featureImages: [],
};

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/feature/add`,
         formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
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
            console.log("add feature fil", action);
            
            state.isLoading = false;
            state.featureImages = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(addFeatureImage.rejected, (state, action) => {
            console.log("add feature rej", action);
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