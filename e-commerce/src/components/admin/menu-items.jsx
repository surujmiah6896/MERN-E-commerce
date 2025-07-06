import { VStack, HStack, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ setOpen, adminSidebarMenuItems }) => {
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
};

export default MenuItems;
