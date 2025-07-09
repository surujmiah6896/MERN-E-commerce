import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HouseIcon } from "lucide-react"; // Replace with Chakra-compatible icon if needed
import { ShoppingCart } from "lucide-react";
import { LogOut, UserCog } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "../../config";
import { fetchCartItems } from "../../store/cart-slice";
import UserCartWrapper from "./user-cart-wrapper";
// import { logoutUser, fetchCartItems } from "@/redux/actions"; // Adjust imports
// import UserCartWrapper from "./UserCartWrapper"; // Assuming it's a Chakra-compatible component

//menu item
function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      );
    } else {
      navigate(getCurrentMenuItem.path);
    }
  }

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      gap={6}
      align={{ lg: "center" }}
      mb={{ base: 3, lg: 0 }}
    >
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Text
          key={menuItem.id}
          fontSize="sm"
          fontWeight="medium"
          cursor="pointer"
          onClick={() => handleNavigate(menuItem)}
          _hover={{ color: "blue.500" }}
        >
          {menuItem.label}
        </Text>
      ))}
    </Flex>
  );
}

//Right Content
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("cartItems", cartItems);
  
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  function handleLogout() {
    console.log("logout");
    
    // dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user.id));
  }, [dispatch, user?.id]);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align={{ lg: "center" }}
      gap={4}
    >
      {/* Cart Drawer Trigger */}
      <Box position="relative">
        <IconButton
          icon={<ShoppingCart />}
          variant="outline"
          aria-label="Cart"
          onClick={onCartOpen}
        />
        <Box
          position="absolute"
          top="-6px"
          right="-1px"
          fontWeight="bold"
          fontSize="xs"
          color="white"
          bg="black"
          borderRadius="full"
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {cartItems?.items?.length || 0}
        </Box>
      </Box>

      {/* Cart Drawer */}
      <Drawer isOpen={isCartOpen} placement="right" onClose={onCartClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <UserCartWrapper
              setOpenCartSheet={() => setOpenCartDrawer(false)}
              cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* User Menu */}
      <Menu>
        <MenuButton>
          <Avatar bg="black" color="white">
            {/* <Avatar.Fallback>
            </Avatar.Fallback> */}
            {/* {user?.userName?.charAt(0).toUpperCase() || "U"} */}
          </Avatar>
        </MenuButton>
        <MenuList>
          <Box px={3} py={2}>
            <Text fontWeight="medium" fontSize="sm">
              Logged in as {user?.userName}
            </Text>
          </Box>
          <MenuDivider />
          <MenuItem onClick={() => navigate("/shop/account")}>
            <UserCog size={16} style={{ marginRight: 8 }} />
            Account
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>
            <LogOut size={16} style={{ marginRight: 8 }} />
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

//shopping header
function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="40"
      w="100%"
      bg="blackAlpha.400"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex
        h="16"
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6 }}
      >
        {/* Logo and Title */}
        <Link to="/shop/home">
          <Flex align="center" gap={2}>
            <HouseIcon size={24} />
            <Text fontWeight="bold">Ecommerce</Text>
          </Flex>
        </Link>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Toggle header menu"
          icon={<HamburgerIcon />}
          display={{ base: "inline-flex", lg: "none" }}
          variant="outline"
          onClick={onOpen}
        />

        {/* Desktop Navigation */}
        <Box display={{ base: "none", lg: "block" }}>{/* <MenuItems /> */}</Box>

        {/* Desktop Right Content */}
        <Box display={{ base: "none", lg: "block" }}>
          <HeaderRightContent />
        </Box>
      </Flex>

      {/* Drawer for Mobile Menu */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="xs">
          <DrawerBody>
            {/* <MenuItems /> */}
            <HeaderRightContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default ShoppingHeader;
