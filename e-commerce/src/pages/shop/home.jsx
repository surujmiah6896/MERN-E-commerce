import {
  Box,
  Flex,
  Button,
  Image,
  Heading,
  SimpleGrid,
  Container,
  Icon,
} from "@chakra-ui/react";
import {
  Airplay,
  BabyIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/redux/slices/shopProductsSlice";
// import { getFeatureImages } from "@/redux/slices/commonSlice";
// import { addToCart, fetchCartItems } from "@/redux/slices/shopCartSlice";
// import ProductDetailsDialog from "./ProductDetailsDialog";
// import ShoppingProductTile from "./ShoppingProductTile";
import useShowToast from "../../hooks/useShowToast";
import { getFeatureImages } from "../../store/feature-slice";
import { fetchAllFilteredProducts } from "../../store/shop/product-slice";
import ShoppingProductList from "../../components/shop/product-list";
import { addToCart } from "../../store/cart-slice";


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { featureImages } = useSelector((state) => state.feature);
  const { products, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const Toast = useShowToast();

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  const handleNavigateToListingPage = (item, section) => {
    console.log("navigate to listing page");
    
  };

  const handleGetProductDetails = (productId) => {
    console.log("get product details", productId);
  };

  const handleAddtoCart = (product_id,) => {
    console.log("add to cart", product_id);
    dispatch(addToCart({ userId: user?.id, productId: product_id, quantity:1 })).then((data)=>{
      console.log("dispatch addtocart", data);
    });
  };

  return (
    <Flex direction="column" minH="100vh">
      {/* Hero Carousel */}
      <Box pos="relative" w="full" h="600px" overflow="hidden">
        {featureImages && featureImages.length > 0
          ? featureImages.map((slider, index) => (
              <Image
                key={index}
                src={`http://localhost:5000/uploads/features/${slider.image}`}
                alt={`slider-${slider._id}`}
                objectFit="cover"
                position="absolute"
                w="full"
                h="full"
                opacity={index === currentSlide ? 1 : 0}
                transition="opacity 1s ease-in-out"
              />
            ))
          : null}

        <Button
          variant="ghost"
          position="absolute"
          top="50%"
          left="4"
          transform="translateY(-50%)"
          bg="whiteAlpha.700"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImages.length) % featureImages.length
            )
          }
        >
          <ChevronLeftIcon boxSize={6} />
        </Button>
        <Button
          variant="ghost"
          position="absolute"
          top="50%"
          right="4"
          transform="translateY(-50%)"
          bg="whiteAlpha.700"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImages.length
            )
          }
        >
          <ChevronRightIcon boxSize={6} />
        </Button>
      </Box>

      {/* Categories */}
      <Box py="6" bg="gray.50">
        <Container maxW="7xl">
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            color={"blackAlpha.500"}
            mb="8"
          >
            Shop by Category
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {categoriesWithIcon.map((item) => (
              <Box
                key={item.id}
                p={6}
                textAlign="center"
                borderRadius="md"
                boxShadow="md"
                bg="white"
                cursor="pointer"
                _hover={{ shadow: "lg" }}
                onClick={() => handleNavigateToListingPage(item, "category")}
              >
                <Icon
                  as={item.icon}
                  boxSize={12}
                  mb={4}
                  color="blackAlpha.500"
                />
                <Box color={"blackAlpha.800"} fontWeight="bold">
                  {item.label}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Brands */}
      <Box py="6" bg="gray.50">
        <Container maxW="7xl">
          <Heading as="h2" size="xl" textAlign="center" color={"blackAlpha.500"} mb="8">
            Shop by Brand
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={4}>
            {brandsWithIcon.map((item) => (
              <Box
                key={item.id}
                p={6}
                textAlign="center"
                borderRadius="md"
                boxShadow="md"
                bg="white"
                cursor="pointer"
                _hover={{ shadow: "lg" }}
                onClick={() => handleNavigateToListingPage(item, "brand")}
              >
                <Icon as={item.icon} boxSize={12} mb={4} color="blue.500" />
                <Box color={"blackAlpha.800"} fontWeight="bold">
                  {item.label}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Feature Products */}
      <Box py="6">
        <Container maxW="7xl">
          <Heading as="h2" size="xl" textAlign="center" mb="1">
            Featured Products
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {products && products.length > 0
              ? products?.map((product) => (
                  <ShoppingProductList
                    key={product._id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Product Details Dialog */}
      {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
    </Flex>
  );
}

export default ShoppingHome;
