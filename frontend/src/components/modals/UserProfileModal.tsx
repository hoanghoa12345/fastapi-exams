import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  VStack,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { User } from "@/types/user";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initUser?: User | null;
  onUpdate: (data: any) => void;
}

const UserProfileModal = ({ isOpen, onClose, initUser, onUpdate }: UserProfileModalProps) => {
  const [user, setUser] = React.useState({
    birth_date: initUser?.birth_date || undefined,
    phone: initUser?.phone || "",
    address: initUser?.address || "",
    email: initUser?.email || "",
    first_name: initUser?.first_name || "",
    last_name: initUser?.last_name || "",
    id: initUser?.id || "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4" align="start">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={user.email} readOnly variant="filled" />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Birthday</FormLabel>
              <Input type="date" name="birth_date" value={user.birth_date} onChange={handleInputChange} min="1900-01-01" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input type="tel" name="phone" value={user.phone} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input type="text" name="address" value={user.address} onChange={handleInputChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => onUpdate(user)} mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserProfileModal;
