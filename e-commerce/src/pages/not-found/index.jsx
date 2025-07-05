import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.800"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading fontSize="6xl" color="teal.500">
          404
        </Heading>
        <Text fontSize="xl" color="gray.300">
          Oops! The page you are looking for does not exist.
        </Text>
        <Button as={RouterLink} to="/" colorScheme="teal" size="md" color={"black"}>
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
}

export default NotFoundPage;
