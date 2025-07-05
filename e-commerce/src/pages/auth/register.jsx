import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CustomForm from "../../components/common/form";
import { registerFormControls } from "../../config";
import { useState } from "react";

const initialState = {
    userName: "",
    email: "",
    password: ""
}
const AuthRegister = () => {
    const [formData, setFormData] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
    }
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
      <CustomForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default AuthRegister;
