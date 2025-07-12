import { Flex, Skeleton } from "@chakra-ui/react";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFoundPage from "./pages/not-found";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import CheckAuth from "./components/common/check-auth";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import ShoppingLayout from "./components/shop/layout";
import ShoppingHome from "./pages/shop/home";
import ShoppingCheckout from "./pages/shop/checkout";
import AdminOrders from "./pages/admin/orders";
import UnauthPage from "./pages/unauth-page";
import AdminCategory from "./pages/admin/category";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  console.log(isLoading, user, isAuthenticated);
  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
  
  return (
    <Flex direction="column" overflow="hidden" bg="white">
      {/* children here */}
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              {" "}
            </CheckAuth>
          }
        />
        {/* auth */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        {/* admin */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="category" element={<AdminCategory />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
        </Route>

        {/* shop */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="checkout" element={<ShoppingCheckout />}></Route>
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Flex>
  );
}

export default App;
