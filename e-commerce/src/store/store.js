import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "./auth-slice";
import adminProductsReducer from "../store/admin/product-slice/index";
import featureReducer from "./feature-slice/index";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,

    feature: featureReducer,
  },
});

export default store;