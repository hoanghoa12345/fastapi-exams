import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { Exam, Part, QuestionGroup } from "@/types";
import { ExamApi } from "@/services/getExams";
import { useCreateTestStore } from "@/stores/useCreateTest";
import CreateQuestionModal from "@/components/modals/CreateQuestionModal";
import QuestionGroupCard from "@/components/questions/QuestionGroupCard";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  title: string;
  action: () => void;
};

const ViewTest = () => {
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [loadedTabs, setLoadedTabs] = useState<number[]>([]);
  const [questionGroups, setQuestionGroups] = useState<any[]>([]);

  const currentExam = useCreateTestStore((state) => state.currentExam);
  const setCurrentExam = useCreateTestStore((state) => state.setCurrentExam);
  const parts = useCreateTestStore((state) => state.parts);
  const setParts = useCreateTestStore((state) => state.setParts);
  const part = useCreateTestStore((state) => state.part);
  const setPart = useCreateTestStore((state) => state.setPart);
  const partId = useCreateTestStore((state) => state.partId);

  const toast = useToast();
  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchQuestionGroup = async (partId: string, index: number) => {
    const { data } = await ExamApi.getQuestionGroups(partId);
    questionGroups[index] = data;
    setQuestionGroups(questionGroups);
  };  

  const loadTabData = (index: number) => {
    if (!loadedTabs.includes(index)) {
      // console.log(`Loading data for tab ${index}`);
      setLoadedTabs((prevTabs) => [...prevTabs, index]);
      const partId = parts[index].id;
      fetchQuestionGroup(partId, index);
    }
  };

  const handleCreatePart = async () => {
    if (id && initialRef.current != null) {
      const inputRef = initialRef.current as HTMLInputElement;
      const { data } = await ExamApi.createPart(id, inputRef.value);
      setParts([...parts, data]);
      toast({
        title: "Part created.",
        description: "Part created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateQuestion = async (data: any) => {
    console.log("Form submitted:", data);
    if (!part) {
      toast({
        title: "Part is required",
        description: "Part is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const res = await ExamApi.createQuestion({
      ...data,
      part_id: part?.id,
      group_id: null,
    });
    if (res.status === 200) {
      toast({
        title: "Question created.",
        description: "Question created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchParts = async (id: string) => {
      const { data } = await ExamApi.getParts(id);
      setParts(data);
    };

    const fetchExam = async (id: string) => {
      const { data } = await ExamApi.getExam(id);
      setCurrentExam(data);
    };

    if (id) {
      fetchParts(id);
      fetchExam(id);
    }   
  }, []);

  useEffect(() => {
    if (parts.length > 0) {
      setPart(parts[0]);
      fetchQuestionGroup(parts[0].id, 0);
    }
  },[parts])

  return (
    <Box h="full" w="full" p={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/create-test/">Create test</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/create-test/${id}`}>{currentExam?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack spacing={4} direction="row" justifyContent="end">
        <Button colorScheme="teal" onClick={onOpen}>
          Create part
        </Button>
      </Stack>
      <Tabs
        onChange={(index: number) => {
          setTabIndex(index);
          loadTabData(index);
        }}>
        <TabList>
          {parts.map((part) => (
            <Tab onClick={() => setPart(part)} key={part.id}>
              {part.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {parts.map((part, index) => (
            <TabPanel key={part.id}>
              <Button type="button" onClick={() => setIsOpenModal(true)} colorScheme="teal">
                Create Questions
              </Button>
              <ViewTest.QuestionGroups questionGroups={questionGroups[index]} />
            </TabPanel>
          ))}
        </TabPanels>
        <CreateQuestionModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSubmit={handleCreateQuestion} />
      </Tabs>
      <ViewTest.Modal isOpen={isOpen} onClose={onClose} title="Part" action={handleCreatePart} initialRef={initialRef} />
    </Box>
  );
};

ViewTest.Modal = ({ isOpen, onClose, initialRef, title, action }: ModalProps) => (
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

ViewTest.QuestionGroups = ({ questionGroups }: { questionGroups?: QuestionGroup[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionGroup, setCurrentQuestionGroup] = useState<QuestionGroup | null>(null);
  
  const toast = useToast();
  
  const handleAddQuestion = (questionGroup: QuestionGroup) => {
    setCurrentQuestionGroup(questionGroup);
    setIsOpen(true);
  };

  const handleCreateQuestion = async (data: any) => {
    if (currentQuestionGroup?.id == null) {
      toast({
        title: "Question group is required",
        description: "Question group is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const res = await ExamApi.createQuestion({
      ...data,
      part_id: currentQuestionGroup?.part_id,
      group_id: currentQuestionGroup?.id,
    });
    if (res.status === 200) {
      toast({
        title: "Question created.",
        description: "Question created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box mt={4}>
      {questionGroups?.map((questionGroup) => (
        <QuestionGroupCard
        key={questionGroup.id}
        id={questionGroup.id}
        title={questionGroup.name}
        questions={questionGroup.questions}
        onAddQuestion={() => handleAddQuestion(questionGroup)}
        />
      ))}
       <CreateQuestionModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleCreateQuestion} />
    </Box>
  );
};

export default ViewTest;
