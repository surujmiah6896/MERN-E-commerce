// CategoryProductPage.jsx

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Your thunks
import { shoppingViewHeaderMenuItems } from "../config";
import { getFeatureImages } from "../store/feature-slice";
import { getAllAdminCategories } from "../store/admin/category-slice";
import { fetchAllFilteredProducts, fetchProductsWithCategoryId } from "../store/shop/product-slice";
import { addToCart } from "../store/cart-slice";
import useShowToast from "../hooks/useShowToast";
import ShoppingProductList from "../components/shop/product-list";

const CategoryProducts = () => {
  const { featureImages } = useSelector((state) => state.feature);
  const { categories } = useSelector((state) => state.adminCategory);
  const { products } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const Toast = useShowToast();

  useEffect(() => {
    dispatch(getFeatureImages());
    dispatch(getAllAdminCategories());
  }, [dispatch]);

    const bgColor = useColorModeValue("gray.50", "gray.700");
    const textColor = useColorModeValue("gray.800", "white");

  const { categoryId } = useParams();

  useEffect(()=>{
    dispatch(fetchProductsWithCategoryId(categoryId));
  },[dispatch]);

  console.log("products", products);
  

  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedBrands, setSelectedBrands] = useState([]);
  // const [priceRange, setPriceRange] = useState([0, 1000]);
  // const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (selected) => {
    const filters = {
      categories: selectedCategories.join(","), // Join array to comma-separated string
      // brands: selectedBrands.join(","),
      // minPrice: priceRange[0],
      // maxPrice: priceRange[1],
      // search: searchQuery.trim(),
    };
    dispatch(fetchAllFilteredProducts(filters));
 
  };


    const handleGetProductDetails = (productId) => {
      console.log("get product details", productId);
    };
  
    const handleAddtoCart = async(product_id,) => {
      console.log("add to cart", product_id);
        try{
            const data = await dispatch(
              addToCart({ userId: user?.id, productId: product_id, quantity: 1 })
            ).unwrap();
            console.error("Add to cart Error:", data);
            if (data?.status) {
              Toast("Success", "Add to cart Successfully", "success");
            }
         } catch (error) {
           console.error("Add to cart Error:", error);
           const errorMsg =
             error?.message || error?.errors?.avatar?.msg || "Something went wrong";
           Toast("Error", errorMsg, "error");
         }
     
    };



//   const { categories, isLoading: loadingCategories } = useSelector(
//     (state) => state.category
//   );
//   const { categoryProducts, isLoading: loadingProducts } = useSelector(
//     (state) => state.product
//   );

//   useEffect(() => {
//     dispatch(getAllAdminCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (categoryId) dispatch(getProductsByCategory(categoryId));
//   }, [dispatch, categoryId]);



  return (
    <Flex w="full" minH="100vh" p={4} flexDir="column" gap={6}>
      {/* Hero Carousel */}
      <Box
        pos="relative"
        w="full"
        h={{ base: "200px", md: "400px", lg: "400px" }}
        overflow="hidden"
        mb={6}
      >
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
          zIndex={1}
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
          zIndex={1}
        >
          <ChevronRightIcon boxSize={6} />
        </Button>
      </Box>

      {/* Categories and Products Section */}
      <Flex w="full" gap={6} flexDir={{ base: "column", md: "row" }}>
        {/* Left Sidebar: Categories */}
        <Box
          h="80vh"
          w={{ base: "full", md: "16rem" }}
          borderRightWidth={{ base: 0, md: "1px" }}
          pr={{ base: 0, md: 6 }}
          py={6}
          px={4}
          bg={bgColor}
          color={textColor}
          rounded="md"
          shadow="md"
          overflowY="auto"
        >
          <Heading
            size="md"
            mb={4}
            color={textColor}
            fontWeight="bold"
            borderBottom="2px solid"
            borderColor="gray.200"
            pb={2}
          >
            Filter by Category
          </Heading>

          <CheckboxGroup value={selectedCategories} onChange={handleChange}>
            <VStack align="start" spacing={3}>
              {categories.map((cat) => (
                <Checkbox key={cat._id} value={cat._id} colorScheme="blue">
                  {cat.name}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
        </Box>

        {/* Right Content: Products */}
        <Box flex="1" color={"black"}>
          <Heading size="md" mb={4}>
            Products
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {products && products.length > 0
              ? products.map((product) => (
                  <ShoppingProductList
                    key={product._id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CategoryProducts;
