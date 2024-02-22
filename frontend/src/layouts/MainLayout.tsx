import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/header/Navbar";
import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
import { Cookies } from "@/utils/cookie";

const MainLayout = () => {
  const userStore = useUserStore();

  const fetchCurrentUser = () => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      authApi.me(accessToken).then((res) => {
        userStore.setUser(res.data);
      });
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
