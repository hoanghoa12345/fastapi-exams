import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/header/Navbar";
import { useAuth } from "@/hooks/useAuth";

const MainLayout = () => {
  const {} = useAuth()
  return (
    <Flex direction={"column"} h="100vh">
      <Navbar />
      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default MainLayout;
