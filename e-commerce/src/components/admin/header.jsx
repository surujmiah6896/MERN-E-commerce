import {
  Box,
  Flex,
  IconButton,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AlignJustify, LogOut } from "lucide-react";

const AdminHeader = ({ setOpen, handleLogout }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

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
            onClick={() => setOpen(true)}
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
