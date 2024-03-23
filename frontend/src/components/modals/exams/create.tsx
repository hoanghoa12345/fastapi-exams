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
  Switch,
  Textarea,
  VStack,
  chakra,
} from "@chakra-ui/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExamAdminAPI } from "@/services/admin/examAdminApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReload: () => void;
}

const CreateTestSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  audio_file: z.string(),
  type: z.string(),
  date: z.string(),
  duration: z.string(),
  description: z.string(),
  thumbnail_path: z.string(),
  is_published: z.boolean(),
});

const ModalCreate = ({ isOpen, onClose, handleReload }: ModalProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CreateTestSchema>>({
    resolver: zodResolver(CreateTestSchema),
  });

  const onSubmit = async (data: z.infer<typeof CreateTestSchema>) => {
    try {
      await ExamAdminAPI.create(data);
      handleReload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent as={chakra.form} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={VStack}>
          <FormControl isInvalid={errors.name ? true : false}>
            <FormLabel
              htmlFor="name"
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
              id="name"
              autoComplete="given-name"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("name")}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.audio_file ? true : false}>
            <FormLabel
              htmlFor="audio_file"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Audio File
            </FormLabel>
            <Input
              type="text"
              id="audio_file"
              autoComplete="given-name"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("audio_file")}
            />
            <FormErrorMessage>
              {errors.audio_file && errors.audio_file.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.type ? true : false}>
            <FormLabel
              htmlFor="type"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Type
            </FormLabel>
            <Input
              type="text"
              id="type"
              autoComplete="given-name"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("type")}
            />
            <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.date ? true : false}>
            <FormLabel
              htmlFor="date"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Date
            </FormLabel>
            <Input
              type="date"
              id="date"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("date")}
            />
            <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.duration ? true : false}>
            <FormLabel
              htmlFor="duration"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Duration
            </FormLabel>
            <Input
              type="duration"
              id="duration"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("duration")}
            />
            <FormErrorMessage>{errors.duration && errors.duration.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description ? true : false}>
            <FormLabel
              htmlFor="description"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Description
            </FormLabel>
            <Textarea
              id="description"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("description")}
            />
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.thumbnail_path ? true : false}>
            <FormLabel
              htmlFor="thumbnail_path"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Thumbnail Path
            </FormLabel>
            <Input
              type="text"
              id="thumbnail_path"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              {...register("thumbnail_path")}
            />
            <FormErrorMessage>
              {errors.thumbnail_path && errors.thumbnail_path.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.is_published ? true : false}>
            <FormLabel
              htmlFor="is_published"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}>
              Is Published
            </FormLabel>
            <Switch id="is_published" {...register("is_published")} />
            <FormErrorMessage>
              {errors.is_published && errors.is_published.message}
            </FormErrorMessage>
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
