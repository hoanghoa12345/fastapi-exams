import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
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
  Menu,
  MenuList,
  MenuGroup,
  MenuItem,
  Link,
  MenuButton,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
import { UserMenu } from "@/components/menus/UserMenu";
import { userRoles } from "@/utils/constants";
import UserProfileModal from "@/components/modals/UserProfileModal";
const CONTAINER_WIDTH = "container.xl";
const HORIZONTAL_LAYOUT = 1;
const VERTICAL_LAYOUT = 2;
const AdminLayout = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const user = userStore.user;
  const [errors, setErrors] = useState(null);
  const [layout, setLayout] = useState<number>(HORIZONTAL_LAYOUT);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const handleLogout = () => {
    userStore.removeUser();
    localStorage.removeItem("token");
    onClose();
    navigate("/login");
  };
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/",
      icon: <i className="bx bx-home" />,
    },
    {
      name: "Create Test",
      path: "/admin/create-test",
      icon: <i className="bx bx-folder-plus" />,
    },
  ];
  const fetchCurrentUser = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      authApi
        .me(accessToken)
        .then((res) => {
          userStore.setUser(res.data);
        })
        .catch((error) => {
          // navigate("/login");
          setErrors(error);
        });
    } else {
      navigate("/login");
    }
  };

  const handleUpdateUser = async (form: any) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      const { data } = await authApi.update(accessToken, form);
      userStore.setUser(data);
      toast({
        title: "Success",
        description: "Your profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      onCloseProfile();
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <Box h="full">
      {layout === HORIZONTAL_LAYOUT ? (
        <Flex h="full">
          {/* Sidebar menu */}
          {/* Header logo */}
          <Box as="nav" pos="fixed" left="0" top="0" h="100%" p="4" w="250px" borderRight="1px" borderRightColor="gray.200">
            <VStack spacing="4" align="flex-start">
              <Heading as="h2" size={"md"}>
                Admin Panel
              </Heading>
              <VStack my={2} spacing={4}>
                {menuItems.map((item) => (
                  <Link as={RouterLink} to={item.path} key={item.path}>
                    {item.icon} {item.name}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </Box>
          {/* Content Layout */}
          <Box ml="250px" w="full" overflowY="auto">
            {errors ? (
              <Alert status="warning">
                <AlertIcon />
                Seems your account session is expire, <RouterLink to="/login">re-login</RouterLink> now
              </Alert>
            ) : null}
            <HStack spacing="4" p={2} borderBottom={"1px"} borderColor={"gray.200"}>
              <InputGroup w={480}>
                <InputLeftElement pointerEvents="none">
                  <i className="bx bx-search" />
                </InputLeftElement>
                <Input placeholder="Search..." />
              </InputGroup>

              <Spacer />
              <Menu>
                <MenuButton>
                  <Avatar size="sm" name={user?.first_name} />
                </MenuButton>
                <MenuList>
                  <MenuItem as="button" onClick={onOpenProfile}>
                    Profile
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/admin/settings">
                    Settings
                  </MenuItem>
                  <MenuItem as="button" onClick={onOpen}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Flex>
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
      <UserProfileModal isOpen={isOpenProfile} onClose={onCloseProfile} initUser={userStore.user} onUpdate={handleUpdateUser} />
    </Box>
  );
};

export default AdminLayout;
