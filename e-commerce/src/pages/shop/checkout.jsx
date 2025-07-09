import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import UserCartItemsContent from "../../components/shop/cart-item-content";
import img from "../../assets/account.jpg";
import CustomForm from "../../components/common/form";
import { addressFormControls, loginFormControls } from "../../config";
import Address from "../../components/shop/address-card";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();


    const initialState = {
        address:"",
        city:"",
        phone:"",
        notes:""
    };
    const [formData, setFormData] = useState(initialState);

    const totalCartAmount =
        cartItems?.items?.length > 0
        ? cartItems.items.reduce(
            (sum, item) =>
                sum +
                (item?.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
            0
            )
        : 0;

  const handleInitiatePaypalPayment = (e) => {
        e.preventDefault();
    console.log("formdata",formData);
    // return;
    
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (!formData) {
      toast({
        title: "Please select one address to proceed.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        address: formData?.address,
        city: formData?.city,
        phone: formData?.phone,
        notes: formData?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  };

//   if (approvalURL) {
//     window.location.href = approvalURL;
//   }

  return (
    <Flex direction="column">
      <Box height="300px" w="full" overflow="hidden">
        <Image
          src={img}
          alt="Checkout Banner"
          objectFit="cover"
          w="full"
          h="full"
        />
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        p={5}
        mt={5}
      >
        <GridItem bg={"blackAlpha.400"} p={4} borderRadius={4} color={"black"}>
          <CustomForm
            formControls={addressFormControls}
            buttonText={"Sign In"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleInitiatePaypalPayment}
            isLoading={isPaymentStart}
          />
          {/* <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          /> */}
        </GridItem>

        <GridItem bg={"blackAlpha.400"} p={4} borderRadius={4} color={"black"}>
          <VStack spacing={4} align="stretch" color={"black"}>
            {cartItems?.items?.length > 0 &&
              cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))}

            <Box pt={4} color={"black"}>
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text>${totalCartAmount.toFixed(2)}</Text>
              </Flex>
            </Box>

            {/* <Box>
              <Button
                colorScheme="blue"
                w="full"
                onClick={handleInitiatePaypalPayment}
                isLoading={isPaymentStart}
                loadingText="Processing Paypal Payment..."
              >
                Checkout with Paypal
              </Button>
            </Box> */}
          </VStack>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default ShoppingCheckout;
