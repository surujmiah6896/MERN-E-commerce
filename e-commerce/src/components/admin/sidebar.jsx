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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  ChartBarStacked,
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
    id: 2,
    label: "Category",
    icon: <ChartBarStacked />,
    children: [
      { id: 21, label: "All Categories", path: "/admin/category" },
      { id: 22, label: "Subcategories", path: "/admin/subcategory" },
    ],
  },
  {
    id: 3,
    label: "Products",
    icon: <ShoppingBasket />,
    children: [
      { id: 31, label: "All Products", path: "/admin/products" },
      { id: 32, label: "Add Product", path: "/admin/products/add" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];
function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <Accordion allowMultiple as="nav" mt={8} defaultIndex={[]} allowToggle>
      {adminSidebarMenuItems.map((item) => {
        if (item.children) {
          return (
            <AccordionItem key={item.id} border="none">
              <AccordionButton
                px={3}
                py={2}
                borderRadius="md"
                _hover={{ bg: "gray.100", color: "gray.900" }}
                color="gray.600"
              >
                <HStack flex="1" textAlign="left" spacing={3}>
                  <Box>{item.icon}</Box>
                  <Text fontSize="lg">{item.label}</Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={2} pl={8}>
                <VStack align="start" spacing={1}>
                  {item.children.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      size="sm"
                      w="full"
                      justifyContent="start"
                      color="gray.600"
                      _hover={{ bg: "gray.100", color: "gray.900" }}
                      onClick={() => {
                        navigate(subItem.path);
                        if (setOpen) setOpen(false);
                      }}
                    >
                      {subItem.label}
                    </Button>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          );
        } else {
          return (
            <AccordionItem key={item.id} border="none" isFocusable={false}>
              <Box
                as="button"
                w="full"
                px={3}
                py={2}
                borderRadius="md"
                onClick={() => {
                  navigate(item.path);
                  if (setOpen) setOpen(false);
                }}
                _hover={{ bg: "gray.100", color: "gray.900" }}
                color="gray.600"
              >
                <HStack spacing={3}>
                  <Box>{item.icon}</Box>
                  <Text fontSize="lg">{item.label}</Text>
                </HStack>
              </Box>
            </AccordionItem>
          );
        }
      })}
    </Accordion>
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
                <MenuItems setOpen={setOpen} />
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
