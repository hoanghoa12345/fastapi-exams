import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useUserStore } from "@/stores/useUserStore";

const ProfilePage = () => {
  const userStore = useUserStore();
  const [user, setUser] = useState({
    email: userStore.user?.email || '',
    firstName: userStore.user?.first_name || '',
    lastName: userStore.user?.last_name || '',
    birthday: userStore.user?.birth_date || '',
    phoneNumber: userStore.user?.phone || '',
    city: "New York",
    address: userStore.user?.address || '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    // Handle saving changes to the backend or perform other actions
    console.log("User details saved:", user);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <Box p="4">
      <Heading mb="4">Profile</Heading>
      <VStack spacing="4" align="start">
        {/* Personal Details Card */}
        <Box bg="gray.100" p="4" borderRadius="md" w="100%">
          <Heading size="md" mb="2">
            Personal Information
          </Heading>
          <Text>
            <strong>Email:</strong> {user.email}
          </Text>
          <Text>
            <strong>First Name:</strong> {user.firstName}
          </Text>
          <Text>
            <strong>Last Name:</strong> {user.lastName}
          </Text>
          <Text>
            <strong>Birthday:</strong> {user.birthday}
          </Text>
        </Box>

        {/* Contact Details Card */}
        <Box bg="gray.100" p="4" borderRadius="md" w="100%">
          <Heading size="md" mb="2">
            Contact Information
          </Heading>
          <Text>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </Text>
          <Text>
            <strong>City:</strong> {user.city}
          </Text>
          <Text>
            <strong>Address:</strong> {user.address}
          </Text>
        </Box>

        {/* Edit Button and Modal */}
        <HStack>
          <Button colorScheme="blue" onClick={handleEditClick}>
            Edit
          </Button>
          <Modal isOpen={isEditing} onClose={handleCloseModal} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit User Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4" align="start">
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" value={user.email} readOnly variant="filled" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Birthday</FormLabel>
                    <Input type="date" name="birthday" value={user.birthday} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Select name="city" value={user.city} onChange={(e) => handleInputChange(e)}>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                      {/* Add more cities as needed */}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" name="address" value={user.address} onChange={handleInputChange} />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={handleSaveChanges} mr={3}>
                  Save Changes
                </Button>
                <Button onClick={handleCloseModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
