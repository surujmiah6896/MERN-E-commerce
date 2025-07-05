import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const AuthRegister = () => {
  return (
    <Box mx="auto" w="full" maxW="md" spacing={6}>
      <Box textAlign="center">
        <Heading as="h1" size="lg" fontWeight="bold" color="gray.300">
          Create New Account
        </Heading>
        <Text mt={2} color="gray.600">
          Already have a Account
          <ChakraLink
            as={RouterLink}
            to="/auth/login"
            fontWeight="medium"
            color="teal.500"
            ml={2}
            _hover={{ textDecoration: "underline" }}
          >
            Login
          </ChakraLink>
        </Text>
      </Box>
      <h1>Common from</h1>
    </Box>
  );
};

export default AuthRegister;
