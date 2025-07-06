import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Flex minH="100vh" w="full">
        {/* admin sidebar */}
            admin side bar
        {/* main content */}
        <Flex flex={1} direction={"column"}>
            {/* admin header */}
            admin header

            {/* main area */}
            <Box flex={1} bg="gray.50" p={{base:4, md:6}}>
                <Outlet/>
            </Box>
        </Flex>
    </Flex>
  )
}

export default AdminLayout;
