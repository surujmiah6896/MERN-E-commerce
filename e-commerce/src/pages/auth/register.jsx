import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CustomForm from "../../components/common/form";
import { registerFormControls } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import useShowToast from "../../hooks/useShowToast";

const initialState = {
    userName: "",
    email: "",
    password: ""
}
const AuthRegister = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const Toast = useShowToast();

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

       try {
        const data = await dispatch(registerUser(formData)).unwrap();
        console.log("Success Payload:", data);
        Toast("Success", data?.message, "success");
      } catch (error) {
        console.error("Register Error:", error);
        // If your backend sends: res.status(409).json({ message: "User already exists" })
        const errorMsg = error?.message || "Something went wrong";
        Toast("Error", errorMsg, "error");
      }
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
