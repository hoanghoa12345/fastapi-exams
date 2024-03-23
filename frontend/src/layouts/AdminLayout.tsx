import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { site } from "@/utils/constants";
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
import { userRoles } from "@/utils/constants";
import UserProfileModal from "@/components/modals/UserProfileModal";
import { UserMenu } from "@/components/menus/UserMenu";
import { Cookies } from "@/utils/cookie";


const AdminLayout = () => {
  const sidebar = useDisclosure();
  const navigate = useNavigate();
  const userStore = useUserStore();
  const user = userStore.user;
  const [errors, setErrors] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const handleLogout = () => {
    userStore.removeUser();
    localStorage.removeItem("token");
    onClose();
    navigate("/login");
  };
  const navbarItems = [
    {
      name: "Dashboard",
      path: "/admin/",
      icon: MdHome,
    },
    {
      name: "Create Test",
      path: "/admin/create-test",
      icon: FaRss,
    },
  ];
  const fetchCurrentUser = () => {
    // const accessToken = localStorage.getItem("token");
    const accessToken = Cookies.get("token");
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

  type NavItemProps = FlexProps & {
    icon: React.ElementType;
    children: React.ReactNode;
    path?: string;
  }
  const NavItem = (props: NavItemProps) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        as={RouterLink}
        to={props.path || '/admin/'}
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: BoxProps) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="blue.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text as={RouterLink} to="/admin" fontSize="2xl" ml="2" color="white" fontWeight="semibold">
          {site.title}
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {navbarItems.map((navbarItem => <NavItem key={navbarItem.name} icon={navbarItem.icon} path={navbarItem.path}>{navbarItem.name}</NavItem>))}
        <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
        <NavItem icon={HiCode}>Integrations</NavItem>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );

  const AdminUserMenu = (props: AvatarProps) => {
    return (<Menu>
      <MenuButton>
        <Avatar size="sm" name={user?.first_name} {...props} />
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
    </Menu>)
  }

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup
            w="96"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search..." />
          </InputGroup>

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <AdminUserMenu ml="4" />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <Outlet />
        </Box>
      </Box>
      <UserMenu.ModalConfirm isOpen={isOpen} onClose={onClose} onConfirm={handleLogout} />
      <UserProfileModal isOpen={isOpenProfile} onClose={onCloseProfile} initUser={userStore.user} onUpdate={handleUpdateUser} />
    </Box>
  );
};

export default AdminLayout;
