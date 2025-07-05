import { Flex } from "@chakra-ui/react";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

function App() {
  return (
      <Flex direction="column" overflow="hidden" bg="white">
        {/* children here */}
        <Routes>
          <Route path="/auth" element={<AuthLayout/>}>
              <Route path="login" element={<AuthLogin />}></Route>
              <Route path="register" element={<AuthRegister/>}></Route>
          </Route>
        </Routes>
      </Flex>
  );
}

export default App;
