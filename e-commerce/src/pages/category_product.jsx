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
  Input,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Your thunks
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
  }, [dispatch]);

  console.log("products", products);
  

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-lowtohigh");


  useEffect(() => {
    const filters = {
      categories: selectedCategories.join(","),
      brands: selectedBrands.join(","),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: searchQuery.trim(),
    };
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sortBy })
    );
  }, [selectedCategories, selectedBrands, priceRange, searchQuery, sortBy]);


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

  useEffect(() => {
    if (categoryId) dispatch(fetchProductsWithCategoryId(categoryId));
  }, [dispatch, categoryId]);



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
          h="90vh"
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

          {/* Search */}
          <Text fontSize="md" fontWeight="bold" mb="5px">
            Search
          </Text>
          <Input
            placeholder="Ex: T-shirt"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Categories */}
          <Text fontSize="md" fontWeight="bold" mt={6} mb="5px">
            Categories
          </Text>
          <CheckboxGroup
            value={selectedCategories}
            onChange={setSelectedCategories}
          >
            <VStack align="start" spacing={3}>
              {categories.map((cat) => (
                <Checkbox key={cat._id} value={cat._id} colorScheme="blue">
                  {cat.name}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>

          {/* Brands */}
          <Text fontSize="md" fontWeight="bold" mt={6} mb="5px">
            Brands
          </Text>
          <CheckboxGroup value={selectedBrands} onChange={setSelectedBrands}>
            <VStack align="start" spacing={3}>
              {/* {brands.map((brand) => (
                <Checkbox key={brand._id} value={brand._id} colorScheme="green">
                  {brand.name}
                </Checkbox>
              ))} */}
            </VStack>
          </CheckboxGroup>

          {/* Price Range */}
          <Text fontSize="md" fontWeight="bold" mt={6} mb="5px">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Text>
          <RangeSlider
            aria-label={["min", "max"]}
            defaultValue={priceRange}
            min={0}
            max={1000}
            step={10}
            colorScheme="pink"
            onChangeEnd={(val) => setPriceRange(val)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>

        {/* Right Content: Products */}
        <Box flex="1" color={"black"}>
          <Flex flex={"row"} justifyContent="space-between">
            <Heading size="md" mb={4}>
              Products
            </Heading>
            <Box>
              <Select
                placeholder="Select sorting"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-lowtohigh">Price: Low to High</option>
                <option value="price-hightolow">Price: High to Low</option>
                <option value="title-atoz">Title: A → Z</option>
                <option value="title-ztoa">Title: Z → A</option>
              </Select>
            </Box>
          </Flex>
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
