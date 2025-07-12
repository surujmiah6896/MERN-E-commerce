import {
  Box,
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderDetailsView from "./order-details";
import { getAllAdminOrders, getOrderDetails } from "../../store/admin/order-slice";

function AdminOrdersView() {
  const dispatch = useDispatch();
  const { orders, orderDetails } = useSelector((state) => state.adminOrder);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getAllAdminOrders());
  }, [dispatch]);
  

  useEffect(() => {
    if (orderDetails) onOpen();
  }, [orderDetails]);

  const handleFetchOrderDetails = (orderId) => {
      dispatch(getOrderDetails(orderId));
        onOpen();
  };

  const handleCloseModal = () => {
    dispatch(getAllAdminOrders());
    onClose();
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" color={"blackAlpha.500"} mb={4}>
        All Orders
      </Heading>

      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order Date</Th>
            <Th>Order Status</Th>
            <Th>Order Price</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.length > 0 &&
            orders.map((orderItem) => (
              <Tr key={orderItem._id}>
                <Td>{orderItem._id}</Td>
                <Td>{orderItem?.orderDate.split("T")[0]}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      orderItem.orderStatus === "confirmed"
                        ? "green"
                        : orderItem.orderStatus === "rejected"
                        ? "red"
                        : "gray"
                    }
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    {orderItem.orderStatus}
                  </Badge>
                </Td>
                <Td>${orderItem.totalAmount}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                  >
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminOrderDetailsView orderDetails={orderDetails} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminOrdersView;
