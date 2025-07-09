import { Box, Button, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserCartItemsContent from "./cart-item-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) =>
            sum +(currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <Box w="100%" maxW="md" p={4}>
      <VStack spacing={3} align="stretch">
        <Heading size="md">Your Cart</Heading>

        <VStack spacing={4} mt={6} align="stretch">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, i) => (
              <Box key={i}>
                <UserCartItemsContent cartItem={item} />
              </Box>
            ))
          ) : (
            <Text>No items in your cart.</Text>
          )}
        </VStack>

        <Box mt={6}>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">Total</Text>
            {cartItems && cartItems.length > 0 ? (
            <Text fontWeight="bold">${totalCartAmount.toFixed(2)}</Text>): 0}
          </Flex>
        </Box>

        <Button
          mt={6}
          colorScheme="blue"
          w="full"
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
        >
          Checkout
        </Button>
      </VStack>
    </Box>
  );
}

export default UserCartWrapper;
