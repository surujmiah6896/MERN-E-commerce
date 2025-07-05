import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CustomForm from "../../components/common/form";
import { loginFormControls } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import  useShowToast  from '../../hooks/useShowToast';

const initialState = {
  email: "",
  password: "",
};


const AuthLogin = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const Toast = useShowToast();
    const onSubmit = async (event)=>{
      event.preventDefault();

       try {
          const data = await dispatch(loginUser(formData)).unwrap();
          Toast("Success", data?.message, "success");
        } catch (error) {
          console.error("Register Error:", error);
          const errorMsg = error?.message || "Something went wrong";
          Toast("Error", errorMsg, "error");
        }
    }
return (
  <Box mx="auto" w="full" maxW="md" spacing={6}>
    <Box textAlign="center" mb={5}>
      <Heading as="h1" size="lg" fontWeight="bold" color="gray.300">
        Sign in to your account
      </Heading>
      <Text mt={2} color="gray.500">
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
    <CustomForm
      formControls={loginFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </Box>
);
};

export default AuthLogin;
