import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  orderDetails: null,
  isLoading: true,
  error:""
};

export const getAllAdminOrders = createAsyncThunk(
    "get/allAdminorders",
    async () =>{
        const response = await axios.get("http://localhost:5000/api/admin/orders/get");
        console.log("response", response.data);
        
        return response.data;
    }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getAdminOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );

    console.log("response details", response.data);
    
    return response.data;
  }
);


export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);



const adminOrderSlice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
          .addCase(getAllAdminOrders.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllAdminOrders.fulfilled, (state, action) => {
            console.log("get all order full", action);
            
            state.isLoading = false;
            state.orders = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(getAllAdminOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.error?.message;
          })
          .addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action?.payload?.status
              ? action?.payload?.data
              : null;
          })
          .addCase(getOrderDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action?.error?.message;
          });
    }
});

export default adminOrderSlice.reducer;