import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Stack,
  Box,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { userRoles } from "@/utils/constants";

export const UserMenu = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const username = userStore.user?.first_name ?? userStore.user?.email;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    userStore.removeUser();
    localStorage.removeItem("token");
    onClose();
    navigate("/login");
  };
  if (!username) return <Link to="/login">Login</Link>;
  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar name={username} size="md" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Flex>
              <Avatar name={username} />
              <Box ml="3">
                <Text fontWeight="bold">
                  {userStore.user?.first_name} {userStore.user?.last_name}
                  <Badge ml="1" colorScheme="green">
                    {userStore.user?.role}
                  </Badge>
                </Text>
                <Text fontSize="sm">{userStore.user?.email}</Text>
              </Box>
            </Flex>
          </MenuItem>
          <MenuDivider />
          {userStore.user?.role === userRoles.ADMIN ? (
            <MenuItem as={Link} to="/admin">
              Admin
            </MenuItem>
          ) : null}
          <MenuItem as={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuDivider />
          <MenuItem as="button" onClick={onOpen}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <UserMenu.ModalConfirm isOpen={isOpen} onClose={onClose} onConfirm={handleLogout} />
    </>
  );
};

type ModalConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

UserMenu.ModalConfirm = ({ isOpen, onClose, onConfirm }: ModalConfirmProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Logout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you want to logout now?</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            Logout
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
