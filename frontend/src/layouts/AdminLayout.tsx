import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  HStack,
  VStack,
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Stack,
  Divider,
  Heading,
  IconButton,
  Icon,
  Avatar,
  Container,
  useDisclosure,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
import { UserMenu } from "@/components/menus/UserMenu";
import { CirclePlusIcon, HomeIcon } from "@/components/icons";
import { userRoles } from "@/utils/constants";
const CONTAINER_WIDTH = "container.xl";
const HORIZONTAL_LAYOUT = 1;
const VERTICAL_LAYOUT = 2;
const AdminLayout = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const user = userStore.user;
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [errors, setErrors] = useState(null);
  const [layout, setLayout] = useState<number>(HORIZONTAL_LAYOUT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    userStore.removeUser();
    localStorage.removeItem("token");
    onClose();
    navigate("/login");
  };
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/create-test",
      icon: <HomeIcon width={24} height={24} />,
    },
    {
      name: "Create Test",
      path: "/admin/create-test",
      icon: <CirclePlusIcon width={24} height={24} />,
    },
  ];
  const fetchCurrentUser = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      authApi.me(accessToken).then((res) => {
        userStore.setUser(res.data);
        setIsLoadedUser(true);
      }).catch((error) => {
        setErrors(error);
      });
    } else {
      setIsLoadedUser(true);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (isLoadedUser && !user) return <Navigate to="/login" replace />;
  if (isLoadedUser && user?.role !== userRoles.ADMIN) return <Navigate to="/error" replace />;
  return (
    <Box h="full">
      {errors ? <Alert status="warning">
        <AlertIcon />
        Seems your account session is expire, re-login now
      </Alert> : null}
      {layout === HORIZONTAL_LAYOUT ? (
        <HStack h="full">
          <VStack w={300} minH="full" spacing={2}>
            <Box py={8}>
              <Stack justifyContent="center" alignItems="center">
                <Avatar size="md" name={user?.first_name} />
                <Text>{user?.email}</Text>
              </Stack>
            </Box>
            <Divider />
            <VStack py={4} flex={1}>
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  px={2}
                  py={2}
                  cursor="pointer"
                  display="flex"
                  gap={2}
                  _hover={{ backgroundColor: "gray.200" }}
                  w="full"
                  rounded="md"
                  role="button"
                  onClick={() => navigate(item.path)}>
                  {item.icon}
                  <Text>{item.name}</Text>
                </Box>
              ))}
            </VStack>
            <Divider />
            <VStack py={4}>
              <Button variant="outline" w="full" onClick={onOpen}>
                Logout
              </Button>
            </VStack>
          </VStack>
          <Divider orientation="vertical" />
          <Box h="full" w="full" overflowY="auto">
            <Outlet />
          </Box>
        </HStack>
      ) : (
        <>
          <Container maxW={CONTAINER_WIDTH}>
            <Heading size={"md"}>Admin</Heading>
          </Container>
          <Container maxW={CONTAINER_WIDTH}>
            <HStack>
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  px={2}
                  py={2}
                  cursor="pointer"
                  display="flex"
                  gap={2}
                  _hover={{ backgroundColor: "gray.200" }}
                  w="full"
                  rounded="md"
                  role="button"
                  onClick={() => navigate(item.path)}>
                  {item.icon}
                  <Text>{item.name}</Text>
                </Box>
              ))}
            </HStack>
          </Container>
          <Container maxW={CONTAINER_WIDTH}>
            <Outlet />
          </Container>
        </>
      )}
      <UserMenu.ModalConfirm isOpen={isOpen} onClose={onClose} onConfirm={handleLogout} />
    </Box>
  );
};

export default AdminLayout;
