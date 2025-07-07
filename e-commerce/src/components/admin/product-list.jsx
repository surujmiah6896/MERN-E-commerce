import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";

function AdminProductList({
  product,
  setFormData,
  onOpen,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Box
      maxW="sm"
      w="full"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Box position="relative">
        <Image
          src={`http://localhost:5000/uploads/products/${product?.image}`}
          alt={product?.title}
          objectFit="cover"
          w="full"
          h="300px"
          borderTopRadius="lg"
        />
      </Box>

      <Box p="6">
        <Heading as="h2" size="lg" mb="2" mt="2" color={"blackAlpha.700"}>
          {product?.title}
        </Heading>

        <Flex justify="space-between" align="center" mb="2">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="teal.600"
            textDecoration={product?.salePrice > 0 ? "line-through" : "none"}
          >
            ${product?.price}
          </Text>

          {product?.salePrice > 0 && (
            <Text fontSize="lg" fontWeight="bold" color="teal.800">
              ${product?.salePrice}
            </Text>
          )}
        </Flex>

        <Flex justify="space-between" align="center" mt="4">
          <Button
            colorScheme="teal"
            onClick={() => {
              onOpen(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button colorScheme="red" onClick={() => handleDelete(product?._id)}>
            Delete
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default AdminProductList;
