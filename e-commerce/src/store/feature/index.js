import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
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

const featureSlice = createSlice({
    name:"featureSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

    }
});


export default featureSlice.reducer;