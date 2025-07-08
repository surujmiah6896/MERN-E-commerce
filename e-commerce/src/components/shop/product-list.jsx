import {
  Box,
  Image,
  Badge,
  Button,
  Text,
  Flex,
  VStack,
  HStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { brandOptionsMap, categoryOptionsMap } from "../../config";

function ShoppingProductList({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock < 10;
  const isOnSale = product?.salePrice > 0;

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      w="100%"
      maxW="sm"
      mx="auto"
      bg={"blackAlpha.300"}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Box
        position="relative"
        cursor="pointer"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <Image
          src={`http://localhost:5000/uploads/products/${product?.image}`}
          alt={`feature-${product.title}`}
          w="100%"
          h="300px"
          objectFit="cover"
          borderTopRadius="lg"
        />

        {isOutOfStock ? (
          <Badge position="absolute" top={2} left={2} colorScheme="red">
            Out Of Stock
          </Badge>
        ) : isLowStock ? (
          <Badge position="absolute" top={2} left={2} colorScheme="red">
            Only {product?.totalStock} left
          </Badge>
        ) : isOnSale ? (
          <Badge position="absolute" top={2} left={2} colorScheme="red">
            Sale
          </Badge>
        ) : null}
      </Box>

      <Box p={4}>
        <Text fontSize="xl" color={"blackAlpha.700"} fontWeight="bold" mb={2}>
          {product?.title}
        </Text>

        <Flex justifyContent="space-between" mb={2}>
          <Text fontSize="sm" color="gray.500">
            {categoryOptionsMap[product?.category]}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {brandOptionsMap[product?.brand]}
          </Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="blue.600"
            textDecor={isOnSale ? "line-through" : "none"}
          >
            ${product?.price}
          </Text>
          {isOnSale && (
            <Text fontSize="lg" fontWeight="semibold" color="blue.600">
              ${product?.salePrice}
            </Text>
          )}
        </Flex>
      </Box>

      <Box px={4} pb={4}>
        {isOutOfStock ? (
          <Button w="100%" isDisabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            w="100%"
            colorScheme="blue"
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          >
            Add to Cart
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ShoppingProductList;
