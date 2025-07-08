import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "../store/admin/product-slice/index";
import featureReducer from "./feature-slice/index";
import shopProductReducer from "./shop/product-slice";
import shopCartReducer from "./cart-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsReducer,

    feature: featureReducer,
    shopProducts: shopProductReducer,
    shopCart: shopCartReducer,

  },
});

export default store;