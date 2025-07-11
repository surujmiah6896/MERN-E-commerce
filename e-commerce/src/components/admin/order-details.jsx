import {
  Box,
  Text,
  Badge,
  Divider,
  VStack,
  HStack,
  UnorderedList,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomForm from "../common/form";
import { getAllAdminOrders, getOrderDetails, updateOrderStatus } from "../../store/admin/order-slice";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetails(orderDetails?._id));
        dispatch(getAllAdminOrders());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  return (
    <Box maxW="600px" p={4}>
      <VStack spacing={4} align="stretch">
        {/* Order Info */}
        <Box>
          <HStack justify="space-between">
            <Text fontWeight="medium">Order ID</Text>
            <Text>{orderDetails?._id}</Text>
          </HStack>
          <HStack justify="space-between" mt={2}>
            <Text fontWeight="medium">Order Date</Text>
            <Text>{orderDetails?.orderDate?.split("T")[0]}</Text>
          </HStack>
          <HStack justify="space-between" mt={2}>
            <Text fontWeight="medium">Order Price</Text>
            <Text>${orderDetails?.totalAmount}</Text>
          </HStack>
          <HStack justify="space-between" mt={2}>
            <Text fontWeight="medium">Payment Method</Text>
            <Text>{orderDetails?.paymentMethod}</Text>
          </HStack>
          <HStack justify="space-between" mt={2}>
            <Text fontWeight="medium">Payment Status</Text>
            <Text>{orderDetails?.paymentStatus}</Text>
          </HStack>
          <HStack justify="space-between" mt={2}>
            <Text fontWeight="medium">Order Status</Text>
            <Badge
              colorScheme={
                orderDetails?.orderStatus === "confirmed"
                  ? "green"
                  : orderDetails?.orderStatus === "rejected"
                  ? "red"
                  : "gray"
              }
              px={3}
              py={1}
              borderRadius="md"
            >
              {orderDetails?.orderStatus}
            </Badge>
          </HStack>
        </Box>

        <Divider />

        {/* Cart Items */}
        <Box>
          <Text fontWeight="medium" mb={2}>
            Order Details {orderDetails}
          </Text>
          <UnorderedList spacing={3}>
            {orderDetails?.cartItems?.map((item, idx) => (
              <ListItem key={idx}>
                <HStack justify="space-between">
                  <Text>Title: {item.title}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: ${item.price}</Text>
                </HStack>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        {/* Shipping Info */}
        <Box>
          <Text fontWeight="medium" mb={2}>
            Shipping Info
          </Text>
          <VStack align="start" spacing={1} color="gray.600">
            <Text>{user?.userName}</Text>
            <Text>{orderDetails?.addressInfo?.address}</Text>
            <Text>{orderDetails?.addressInfo?.city}</Text>
            <Text>{orderDetails?.addressInfo?.phone}</Text>
            <Text>{orderDetails?.addressInfo?.notes}</Text>
          </VStack>
        </Box>

        {/* Update Form */}
        <Box>
          <CustomForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </Box>
      </VStack>
    </Box>
  );
}

export default AdminOrderDetailsView;
