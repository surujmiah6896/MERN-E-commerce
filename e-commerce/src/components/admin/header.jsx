import {
  Box,
  Flex,
  IconButton,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
import useShowToast from "../../hooks/useShowToast";

const AdminHeader = ({ onOpen }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch();
  const Toast = useShowToast();
  const handleLogout = () => {
    try {
      const data = dispatch(logoutUser()).unwrap();
      if (data?.status) {
        Toast("Success", "Logged out Successfully", "success");
      }
    } catch (error) {
      console.error("Logged out Error:", error);
      const errorMsg =
        error?.message || error?.errors?.avatar?.msg || "Something went wrong";
      Toast("Error", errorMsg, "error");
    }
  };

  return (
    <Box
      as="header"
      px={4}
      py={3}
      borderBottom="1px"
      borderColor="gray.200"
      bg="gray.50"
    >
      <Flex align="center" justify="space-between">
        {isMobile && (
          <IconButton
            icon={<AlignJustify />}
            aria-label="Toggle Menu"
            onClick={() => onOpen(true)}
            display={{ base: "block", lg: "none" }}
          />
        )}

        <Flex flex="1" justify="flex-end">
          <Button
            onClick={handleLogout}
            leftIcon={<LogOut />}
            colorScheme="blue"
            variant="solid"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
