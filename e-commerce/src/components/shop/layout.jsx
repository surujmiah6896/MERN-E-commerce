import { Box, Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <Flex direction="column" bg="white" overflow="hidden" minH="100vh">
      {/* Common Header */}
      <ShoppingHeader />

      <Box as="main" w="full" flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}

export default ShoppingLayout;
