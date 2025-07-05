import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const AuthLogin = () => {
        return (
      <Box mx="auto" w="full" maxW="md" spacing={6}>
        <Box textAlign="center">
          <Heading as="h1" size="lg" fontWeight="bold" color="gray.800">
            Sign in to your account
          </Heading>
          <Text mt={2} color="gray.600">
            Don&apos;t have an account?
            <ChakraLink
              as={RouterLink}
              to="/auth/register"
              fontWeight="medium"
              color="teal.500"
              ml={2}
              _hover={{ textDecoration: "underline" }}
            >
              Register
            </ChakraLink>
          </Text>
        </Box>
        <h1>Common from</h1>
      </Box>
      
  );
};

export default AuthLogin;
