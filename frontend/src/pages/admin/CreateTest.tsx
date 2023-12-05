import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Heading,
  FormLabel,
  Stack,
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useDisclosure,
  useToast,
  FormHelperText,
  Text,
  Grid,
  InputRightElement,
} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { ExamApi } from "@/services/getExams";
import { Exam, Part, QuestionGroup } from "@/types";
import BaseTable, { TableColumn } from "@/components/tables/BaseTable";
import { useNavigate } from "react-router-dom";
type Props = {};

type ExamProps = {
  onOpenModal: () => void;
};

type FormFieldSelect = {
  label: string;
  type: string;
  textHelper?: string;
  name?: string;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  title: string;
  action: () => void;
};

const createTypes = [
  {
    value: "test",
    label: "Test",
  },
  {
    value: "part",
    label: "Part",
  },
  {
    value: "questionGroup",
    label: "Question Group",
  },
];

function CreateTest({}: Props) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>([]);
  const toast = useToast();
  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formCreateTest: FormFieldSelect[] = [
    {
      label: "Test name",
      type: "select",
      textHelper: "Select test name",
      name: "testNameSelect",
      children: exams.map((exam) => (
        <option key={exam.id} value={exam.id}>
          {exam.name}
        </option>
      )),
      onChange: async (e) => {
        const { data } = await ExamApi.getParts(e.target.value);
        setParts(data);
      },
    },
    {
      label: "Test part",
      type: "select",
      textHelper: "Select part name",
      name: "testPartSelect",
      children: parts.map((part) => (
        <option key={part.id} value={part.id}>
          {part.name}
        </option>
      )),
      onChange: async (e) => {
        const { data } = await ExamApi.getQuestionGroups(e.target.value);
        setQuestionGroups(data);
      },
    },
  ];

  const renderCreateComponent = () =>
    formCreateTest.map((field, index) => (
      <FormControl isRequired key={index}>
        <FormLabel>{field.label}</FormLabel>
        <Select placeholder={field.label} onChange={field.onChange}>
          {field.children}
        </Select>
        <FormHelperText>{field.textHelper}</FormHelperText>
      </FormControl>
    ));

  const renderSelectToCreate = () => (
    <Select placeholder="Type">
      {createTypes.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </Select>
  );

  const handleCreateExam = async () => {
    if (initialRef.current != null) {
      const inputRef = initialRef.current as HTMLInputElement;
      if (inputRef.value === "") return;
      const { data } = await ExamApi.createExam({
        name: inputRef.value,
        audio_file: "",
      });
      console.log(data);

      toast({
        title: "Created New Test",
        description: "Test created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box h="full" w="full" p={4}>
      <Heading pb={4} as="h2" size="lg" fontWeight={500}>
        Create New Test
      </Heading>
      {/* {renderCreateComponent()}
      <form>
        <FormControl isRequired>
        <FormLabel>Create</FormLabel>
        <InputGroup>
          <InputLeftAddon children={renderSelectToCreate()} />
          <Input placeholder="Name" type="text" />
          <InputRightElement w={50}>
            <Button colorScheme="teal">Create</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      </form> */}

      <CreateTest.Exams onOpenModal={onOpen} />
      <CreateTest.Modal isOpen={isOpen} onClose={onClose} title="Exam" action={handleCreateExam} initialRef={initialRef} />
    </Box>
  );
}

CreateTest.Exams = ({ onOpenModal }: ExamProps) => {
  const [exams, setExams] = useState<Exam[]>([]);

  const navigate = useNavigate();

  const columns: TableColumn<Exam>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Audio",
      dataIndex: "audio_file",
      key: "audio_file",
    },
  ];

  const handleViewExam = (id: string) => {
    navigate(`/admin/create-test/${id}`);
  };

  const handleEditAction = (id: string) => {
    navigate(`/admin/create-test/${id}`);
  }

  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await ExamApi.getAllExam();
      setExams(data);
    };
    fetchExams();
  }, []);

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="end">
        <Button colorScheme="teal" onClick={onOpenModal}>
          Create
        </Button>
      </Stack>
      <BaseTable dataSource={exams} columns={columns} viewAction={handleViewExam} editAction={handleEditAction}/>
    </>
  );
};

CreateTest.Modal = ({ isOpen, onClose, initialRef, title, action }: ModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Create {title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>{title} name:</FormLabel>
          <Input ref={initialRef} placeholder={`${title} name`} type="text" />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button variant="solid" color={"cyan.500"} mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="blue" onClick={action}>
          Create
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default CreateTest;
