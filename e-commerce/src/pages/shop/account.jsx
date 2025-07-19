import {
  Box,
  Image,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeatureImages } from "../../store/feature-slice";
import { useState } from "react";

const ShoppingAccount = () => {
    const dispatch = useDispatch();

    const [currentSlide, setCurrentSlide] = useState(0);
    const { featureImages } = useSelector((state) => state.feature);

     useEffect(() => {
        dispatch(getFeatureImages());
      }, [dispatch]);
  return (
    <Flex direction="column"  color={"blackAlpha.500"}>
      {/* Banner Image */}
      <Box position="relative" height="300px" width="full" overflow="hidden">
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
      </Box>

      {/* Tab Content */}
      <Container maxW="container.lg" py={8}>
        <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" shadow="sm">
          <Tabs variant="enclosed" defaultIndex={0}>
            <TabList>
              <Tab>Orders</Tab>
              <Tab>Address</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>{/* <ShoppingOrders /> */}</TabPanel>
              <TabPanel>{/* <Address />  */}</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Flex>
  );
};

export default ShoppingAccount;
