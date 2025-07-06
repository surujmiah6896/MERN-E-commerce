import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const localPathName = location.pathname;

  if (localPathName === "/") {
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    } else {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }
  }

  if (
    !isAuthenticated &&
    !(localPathName.includes("/login") || localPathName.includes("/register"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (localPathName.includes("/login") || localPathName.includes("/register"))
  ) {
    if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
    //   redirect("/admin/dashboard");
    } else {
        return <Navigate to="/shop/home" />;
    //   redirect("/shop/home");
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    localPathName.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
    // redirect("/unauth-page");
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    localPathName.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
    // redirect("/admin/dashboard");
  }

  return <>{children}</>;
};

export default CheckAuth;
