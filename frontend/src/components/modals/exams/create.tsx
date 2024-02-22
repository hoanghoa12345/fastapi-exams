import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  chakra,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReload: () => void;
}

const ModalCreate = ({ isOpen, onClose, handleReload }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as={chakra.form}>
        <ModalHeader>Create</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={VStack}>
          <FormControl isInvalid={false}>
            <FormLabel
              htmlFor="first_name"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Name
            </FormLabel>
            <Input
              type="text"
              id="first_name"
              autoComplete="given-name"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              // {...register("first_name")}
            />
            {/* <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage> */}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" color={"cyan.500"} fontWeight="md" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="telegram" fontWeight="md" type="submit">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreate;
