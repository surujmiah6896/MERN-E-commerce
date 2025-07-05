import { Flex } from "@chakra-ui/react";
// import "./App.css";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Flex direction="column" overflow="hidden" bg="white">
        {/* children here */}
        <Routes>
          <Route path="/auth" element={<AuthLayout/>}>

          </Route>
        </Routes>
      </Flex>
    </>
  );
}

export default App;
