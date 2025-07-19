import {
  Box,
  Text,
  Badge,
  Divider,
  VStack,
  HStack,
  List,
  ListItem,
  ModalBody,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const OrderDetailsContent = ({orderDetails}) => {
  const labelColor = useColorModeValue("gray.700", "gray.300");

  
  
  const { user } = useSelector((state) => state.auth);
  console.log("orderDetails pop", orderDetails);
  console.log("orderDetails pop user", user);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "green";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

//   if (!orderDetails || !user) {
  return (
    <ModalBody maxW="600px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Order Info Section */}
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="medium">Order ID</Text>
            <Text color={labelColor}>{orderDetails?._id}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="medium">Order Date</Text>
            <Text color={labelColor}>
              {orderDetails?.orderDate
                ? orderDetails?.orderDate?.split("T")[0]
                : "N/A"}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="medium">Order Price</Text>
            <Text color={labelColor}>${orderDetails?.totalAmount}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="medium">Payment Method</Text>
            <Text color={labelColor}>{orderDetails?.paymentMethod}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="medium">Payment Status</Text>
            <Text color={labelColor}>{orderDetails?.paymentStatus}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="medium">Order Status</Text>
            <Badge
              colorScheme={getStatusColor(orderDetails?.orderStatus)}
              px={3}
              py={1}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </HStack>
        </VStack>

        <Divider />

        {/* Order Items Section */}
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="medium">Order Details</Text>
          <List spacing={3}>
            {orderDetails?.cartItems?.length > 0 &&
              orderDetails.cartItems.map((item, idx) => (
                <ListItem key={idx}>
                  <HStack justify="space-between">
                    <Text>Title: {item.title}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Price: ${item.price}</Text>
                  </HStack>
                </ListItem>
              ))}
          </List>
        </VStack>

        {/* Shipping Info Section */}
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="medium">Shipping Info</Text>
          <VStack align="start" spacing={1} fontSize="sm">
            <Text>{user?.userName}</Text>
            <Text>{orderDetails?.addressInfo?.address}</Text>
            <Text>{orderDetails?.addressInfo?.city}</Text>
            <Text>{orderDetails?.addressInfo?.pincode}</Text>
            <Text>{orderDetails?.addressInfo?.phone}</Text>
            <Text>{orderDetails?.addressInfo?.notes}</Text>
          </VStack>
        </VStack>
      </VStack>
    </ModalBody>
  );
// }
};

export default OrderDetailsContent;
