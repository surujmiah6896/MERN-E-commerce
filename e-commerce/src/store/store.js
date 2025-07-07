import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "./auth-slice";
import adminProductsSlice from "../store/admin/product-slice/index";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
  },
});

export default store;