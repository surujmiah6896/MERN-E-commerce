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
// import { logoutUser, fetchCartItems } from "@/redux/actions"; // Adjust imports
// import UserCartWrapper from "./UserCartWrapper"; // Assuming it's a Chakra-compatible component


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
