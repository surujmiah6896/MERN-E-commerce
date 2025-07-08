import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

const featureSlice = createSlice({
    name:"featureSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

    }
});


export default featureSlice.reducer;