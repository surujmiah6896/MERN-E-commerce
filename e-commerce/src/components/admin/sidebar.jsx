import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ChartNoAxesCombined } from "lucide-react"; // Assuming this is an icon component
// import MenuItems from "./MenuItems"; // Your custom menu items

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Fragment>
      {/* Mobile Drawer Sidebar */}
      {isMobile && (
        <Drawer  isOpen={open} placement="left" onClose={() => setOpen(false)}>
          <DrawerOverlay />
          <DrawerContent maxW="16rem">
            <DrawerCloseButton mt="6" />
            <DrawerHeader borderBottomWidth="1px">
              <Flex align="center" gap={2} mt={2}>
                <ChartNoAxesCombined size={30} />
                <Heading size="md" fontWeight="extrabold">
                  Admin Panel
                </Heading>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" h="full">
                {/* <MenuItems setOpen={setOpen} /> */}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          as="aside"
          w="16rem"
          p={6}
          borderRightWidth="1px"
          bg="blackAlpha.600"
          display={{ base: "none", lg: "flex" }}
          flexDir="column"
        >
          <Flex
            align="center"
            gap={2}
            mb={6}
            cursor="pointer"
            onClick={() => navigate("/admin/dashboard")}
          >
            <ChartNoAxesCombined size={30} />
            <Heading size="md" fontWeight="extrabold">
              Admin Panel
            </Heading>
          </Flex>
          {/* <MenuItems /> */}
        </Box>
      )}
    </Fragment>
  );
};

export default AdminSidebar;
