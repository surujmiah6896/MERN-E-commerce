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
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";// Assuming this is an icon component

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];
function MenuItems({setOpen}){
    const navigate = useNavigate();
    return (
      <VStack as="nav" mt={8} spacing={2} align="stretch">
        {adminSidebarMenuItems.map((menuItem) => (
          <HStack
            key={menuItem.id}
            px={3}
            py={2}
            borderRadius="md"
            cursor="pointer"
            onClick={() => {
              navigate(menuItem.path);
              if (setOpen) setOpen(false);
            }}
            _hover={{ bg: "gray.100", color: "gray.900" }}
            color="gray.600"
          >
            <Box>{menuItem.icon}</Box>
            <Text fontSize="lg">{menuItem.label}</Text>
          </HStack>
        ))}
      </VStack>
    );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Fragment>
      {/* Mobile Drawer Sidebar */}
      {isMobile && (
        <Drawer isOpen={open} placement="left" onClose={() => setOpen(false)}>
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
                <MenuItems setOpen={setOpen}/>
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
          <MenuItems />
        </Box>
      )}
    </Fragment>
  );
};

export default AdminSidebar;
