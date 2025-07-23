import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import AdminSideBar from './sidebar';
import AdminHeader from './header';

const AdminLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex minH="100vh" w="full">
      {/* admin sidebar */}
      <AdminSideBar />
      {/* main content */}
      <Flex flex="1" direction={"column"}>
        {/* admin header */}
        <AdminHeader onOpen={onOpen} />

        {/* main area */}
        <Box flex="1" bg="gray.50" p={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default AdminLayout;
