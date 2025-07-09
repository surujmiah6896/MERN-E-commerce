import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Text,
} from "@chakra-ui/react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      cursor="pointer"
      borderWidth="2px"
      borderColor={isSelected ? "red.600" : "gray.300"}
      _hover={{ borderColor: "red.500" }}
    >
      <CardBody>
        <Box mb={2}>
          <Text fontWeight="bold">Address:</Text>
          <Text>{addressInfo?.address}</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">City:</Text>
          <Text>{addressInfo?.city}</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Pincode:</Text>
          <Text>{addressInfo?.pincode}</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Phone:</Text>
          <Text>{addressInfo?.phone}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Notes:</Text>
          <Text>{addressInfo?.notes}</Text>
        </Box>
      </CardBody>

      <CardFooter justifyContent="space-between">
        <Button size="sm" onClick={() => handleEditAddress(addressInfo)}>
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
