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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminOrdersView() {
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) onOpen();
  }, [orderDetails]);

  const handleFetchOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    dispatch(getOrderDetailsForAdmin(orderId));
  };

  const handleCloseModal = () => {
    dispatch(resetOrderDetails());
    onClose();
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" mb={4}>
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
          {orderList?.length > 0 &&
            orderList.map((orderItem) => (
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
        <ModalContent>
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
