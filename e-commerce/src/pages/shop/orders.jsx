import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersByUserId, getOrderDetails } from "../../store/shop/order-slice";
import { SquarePen } from "lucide-react";
import OrderDetailsContent from "./order-details";

const ShoppingOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  

  console.log("orderDetails", orderDetails);
  const handleViewDetails = (getId) => {
    console.log("getId", getId);
    
    dispatch(getOrderDetails(getId));
    onOpen();
  };

    useEffect(() => {
      dispatch(getAllOrdersByUserId(user?.id));
    }, [dispatch]);

  const handleClose = () => {
    onClose();
    dispatch(getAllOrdersByUserId(user?.id));
  };

  useEffect(() => {
    if (orderDetails !== null) onOpen(true);
  }, [orderDetails]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" shadow="sm">
      <Heading as="h2" size="md" mb={4}>
        Order History
      </Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order Date</Th>
            <Th>Order Status</Th>
            <Th>Order Price</Th>
            <Th>
              <span className="sr-only">Details</span>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {orderList && orderList.length > 0 ? (
            orderList.map((orderItem) => (
              <Tr key={orderItem?._id}>
                <Td>{orderItem?._id}</Td>
                <Td>{orderItem?.orderDate?.split("T")[0]}</Td>
                <Td>
                  <Badge
                    px={3}
                    py={1}
                    colorScheme={
                      orderItem?.orderStatus === "delivered"
                        ? "green"
                        : orderItem?.orderStatus === "rejected"
                        ? "red"
                        : "orange"
                    }
                  >
                    {orderItem?.orderStatus}
                  </Badge>
                </Td>
                <Td>${orderItem?.totalAmount}</Td>
                <Td>
                  <Button
                    size="sm"
                    _hover={{ bg: "blackAlpha.600", color: "blue:500" }}
                    bg="blackAlpha.500"
                    onClick={() => handleViewDetails(orderItem?._id)}
                  >
                    <SquarePen />
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Order Details</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <OrderDetailsContent
                          orderDetails={orderDetails}
                          user={user}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5}>No orders found.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ShoppingOrders;
