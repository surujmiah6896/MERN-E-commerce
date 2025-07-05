import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex minH="100vh" w="full">
      {/* Left side for large screens only */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        align="center"
        justify="center"
        bg="black"
        w="50%"
        px={12}
      >
        <Box maxW="md" textAlign="center" color="white">
          <Heading as="h1" size="2xl" fontWeight="extrabold">
            Welcome to ECommerce Shopping 
          </Heading>
        </Box>
      </Flex>

      {/* Right side (form / Outlet) */}
      <Flex flex="1" align="center" justify="center" bg={bg} px={4} py={12}>
        <Box maxW="md" w="full">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default AuthLayout;
