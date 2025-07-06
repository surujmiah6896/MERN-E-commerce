import { Navigate, useLocation } from "react-router-dom";
import useRedirect from "../Helpers";

const useCheckAuth = ({isAuthenticated, user, children}) => {
    const location = useLocation();
    const localPathName = location.pathname;
    const redirect = useRedirect();

    if (localPathName === "/") {
      if (!isAuthenticated) {
        redirect("/auth/login");
      } else {
        if (user?.role === "admin") {
          redirect("/admin/dashboard");
        } else {
          redirect("/shop/home");
        }
      }
    }

    if (
      !isAuthenticated &&
      !(localPathName.includes("/login") || localPathName.includes("/register"))
    ) {
        redirect("/auth/login");
    }

    if (isAuthenticated && (localPathName.includes("/login") || localPathName.includes("/register"))) {
      if (user?.role === "admin") {
        redirect("/admin/dashboard");
      } else {
        redirect("/shop/home");
      }
    }

    if (isAuthenticated && user?.role !== "admin" && localPathName.includes("admin")) {
        redirect("/unauth-page");
    }

    if (isAuthenticated && user?.role === "admin" && localPathName.includes("shop")) {
        redirect("/admin/dashboard");
    }


  return <>{children}</>;
};

export default useCheckAuth;
