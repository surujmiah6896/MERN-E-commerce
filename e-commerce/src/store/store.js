import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "../store/admin/product-slice/index";
import featureReducer from "./feature-slice/index";
import shopProductReducer from "./shop/product-slice";
import shopCartReducer from "./cart-slice";
import shopOrderReducer from "./shop/order-slice";
import adminOrderReducer from "./admin/order-slice";
import adminCategoryReducer from "./admin/category-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsReducer,
    adminOrder: adminOrderReducer,
    adminCategory: adminCategoryReducer,

    feature: featureReducer,
    shopProducts: shopProductReducer,
    shopCart: shopCartReducer,
    shopOrder: shopOrderReducer,
  },
});

export default store;