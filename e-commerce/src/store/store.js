import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "./auth-slice";
import adminProductsReducer from "../store/admin/product-slice/index";
import featureReducer from "./feature-slice/index";
import shopProductReducer from "./shop/product-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,

    feature: featureReducer,
    shopProducts: shopProductReducer,

  },
});

export default store;