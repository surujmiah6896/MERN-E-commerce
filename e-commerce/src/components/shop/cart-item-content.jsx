import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useShowToast from "../../hooks/useShowToast";
import { deleteCartItem } from "../../store/cart-slice";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { products } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const Toast = useShowToast();

  const handleUpdateQuantity = async(getCartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      const getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = products.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = products[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            Toast(
              "Warning",
              `Only ${getQuantity} quantity can be added for this item`,
              "warning"
            );
            return;
          }
        }
      }
    }

   //dispatch cart qty increment;
   console.log("Cart increment done");
try{
    const data = await dispatch()
   if (data?.status) {
    Toast("Success", "Product Update Successfully", "success");
  }
} catch (error) {
  console.error("Add to cart Error:", error);
  const errorMsg =
    error?.message || error?.errors?.avatar?.msg || "Something went wrong";
  Toast("Error", errorMsg, "error");
}
   
  }

  const handleCartItemDelete = async(getCartItem)=> {
   try {
    const data = await dispatch(deleteCartItem({userId: user?.id, productId: getCartItem?.productId})).unwrap();
     if (data?.status) {
       Toast("Success", "Product Update Successfully", "success");
     }
   } catch (error) {
     console.error("Add to cart Error:", error);
     const errorMsg =
       error?.message || error?.errors?.avatar?.msg || "Something went wrong";
     Toast("Error", errorMsg, "error");
   }
   
  }

  return (
    <Flex align="center" gap={4}>
      <Image
        src={`http://localhost:5000/uploads/products/${cartItem?.image}`}
        alt={`slider-${cartItem.productId}`}
        boxSize="80px"
        borderRadius="md"
        objectFit="cover"
      />

      <Box flex="1">
        <Text fontWeight="bold" noOfLines={1}>
          {cartItem?.title}
        </Text>
        <Flex align="center" gap={2} mt={2}>
          <IconButton
            aria-label="Decrease quantity"
            icon={<Minus size={16} />}
            size="sm"
            variant="outline"
            borderRadius="full"
            isDisabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          />
          <Text fontWeight="medium">{cartItem?.quantity}</Text>
          <IconButton
            aria-label="Increase quantity"
            icon={<Plus size={16} />}
            size="sm"
            variant="outline"
            borderRadius="full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          />
        </Flex>
      </Box>

      <Flex direction="column" align="flex-end">
        <Text fontWeight="semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </Text>
        <IconButton
          aria-label="Delete cart item"
          icon={<Trash size={18} />}
          size="sm"
          variant="ghost"
          mt={1}
          colorScheme="red"
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </Flex>
    </Flex>
  );
}

export default UserCartItemsContent;
