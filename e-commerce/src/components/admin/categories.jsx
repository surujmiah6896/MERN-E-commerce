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
import { getAllAdminCategories } from "../../store/admin/category-slice";

function AdminCategoryView({ setCurrentEditedId, setFormData, onOpen }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.adminCategory);
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getAllAdminCategories());
  }, [dispatch]);
  console.log("categories", categories);

  //   useEffect(() => {
  //     if (categories) onOpen();
  //   }, [categories]);

  //   const handleFetchCategoryDetails = (orderId) => {
  //     dispatch(getOrderDetails(orderId));
  //     onOpen();
  //   };

  //   const handleCloseModal = () => {
  //     dispatch(getAllAdminCategories());
  //     onClose();
  //   };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" color={"blackAlpha.500"} mb={4}>
        All Categories
      </Heading>

      <Table variant="simple" colorScheme="cyan" bg={"black.600"}>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order Name</Th>
            <Th>Order Status</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody color={"blackAlpha.700"}>
          {categories?.length > 0 &&
            categories.map((Item) => (
              <Tr key={Item._id}>
                <Td>{Item._id}</Td>
                <Td>{Item?.name}</Td>
                <Td>
                  <Badge
                    colorScheme={Item.isActive === true ? "green" : "red"}
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    {Item.isActive == true ? "Active" : "Deactive"}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    bg={"blackAlpha.500"}
                    _hover={{ bg: "blackAlpha.600", color: "blue:500" }}
                    size="sm"
                    onClick={() => {
                      onOpen(true);
                      setCurrentEditedId(Item._id);
                      setFormData(Item);
                    }}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Order Details Modal */}
      {/* <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminOrderDetailsView categoryDetails={categoryDetails} />
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </Box>
  );
}

export default AdminCategoryView;
