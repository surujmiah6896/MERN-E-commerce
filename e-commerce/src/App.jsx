import { Flex, Skeleton } from "@chakra-ui/react";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFoundPage from "./pages/not-found";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

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
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Flex>
  );
}

export default App;
