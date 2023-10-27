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
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { ExamApi } from "@/services/getExams";
import { Exam, Part } from "@/types";
type Props = {};

function CreateTest({}: Props) {
  const [selectAnswerType, setSelectAnswerType] = useState(4);
  const [answerArr, setAnswerArr] = useState([1, 2, 3, 4]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [part, setPart] = useState<Part>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const toast = useToast()

  const handleSelectGroupQuestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

  }

  const handleSelectAnswerChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === "4") {
      setAnswerArr([1, 2, 3, 4]);
    } else if (e.target.value === "3") {
      setAnswerArr([1, 2, 3]);
    }
  };

  const handleSelectExamChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {data} = await ExamApi.getParts(e.target.value)
    setParts(data);
    
  };

  const handleSelectPartChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const partItem = parts.find((part) => part.id = e.target.value)
    // console.log(partItem);
    setPart(partItem)

  };

  const handleSubmitData = () => {
    toast({
      title: 'Question created.',
      description: "Question created",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const createNewPart = async () => {
    if(part && initialRef.current != null) {
      const inputRef = initialRef.current as HTMLInputElement
      const {data} = await ExamApi.createPart(part?.exam_id, inputRef.value)
      setParts([...parts, data])
      toast({
        title: 'Part created.',
        description: "Part created",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const fetchExams = async () => {
      const {data} = await ExamApi.getAllExam();
      setExams(data);
    };
    fetchExams();
  }, []);
  return (
    <Box>
      <Box>
        <Heading as="h3" size="md">
          Create New Test
        </Heading>
        <Box>
          <FormControl>
            <FormLabel fontSize={'sm'}>Choose Test: </FormLabel>
            <Stack spacing={3}>
              <Select
                variant="outline"
                placeholder="--Choose Test--"
                size={"sm"}
                onChange={handleSelectExamChange}
              >
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>{exam.name}</option>
                ))}
              </Select>
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={'sm'} flex={1}>Select Part</FormLabel>

            <Select
              placeholder="--Select Part--"
              w="full"
              size={'sm'}
              onChange={handleSelectPartChange}
            >
              {
                parts.map((part) => (
                  <option key={part.id} value={part.id}>{part.name}</option>
                ))
              }
            </Select>
            <Button size='sm' variant={'outline'} onClick={onOpen}>New Part</Button>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={'sm'}>Select Question Group</FormLabel>
            <Select
              placeholder="--Select Question Group--"
              w="full"
              size={'sm'}
              onChange={handleSelectGroupQuestionChange}
            >
              {part?.question_groups.map((group) => (
                <option key={group.id} value={group.id}>{group.id}</option>
              ))}
            </Select>
          </FormControl>
          <Button size='sm' variant={'outline'} onClick={onOpen}>New Question Group</Button>
          <Box>
            <FormControl isRequired>
            <FormLabel fontSize={'sm'}>Enter Question</FormLabel>
            <InputGroup size={'sm'}>
              <InputLeftAddon children="1." />
              <Input placeholder="Question" type="text" />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={'sm'}>Select Answer Type</FormLabel>
            <Select
              placeholder="Select Type"
              w="40"
              size={'sm'}
              onChange={handleSelectAnswerChange}
            >
              <option value="4">4 answers</option>
              <option value="3">3 answers</option>
            </Select>
          </FormControl>
          </Box>
          
          <FormControl isRequired>
            <FormLabel fontSize={'sm'}>Enter Answers</FormLabel>

            <Box>
              {answerArr.map((index) => (
                <InputGroup key={index} size={'sm'}>
                  <InputLeftAddon children={index} />
                  <Input placeholder={`Answer ${index}`} type="text" />
                </InputGroup>
              ))}
            </Box>
          </FormControl>
          <Button colorScheme="teal" type="button" size={'sm'} onClick={handleSubmitData}>
            Create
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
              <FormLabel>Part name:</FormLabel>
              <Input ref={initialRef} placeholder='Part 1' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button  variant='solid' color={'cyan.500'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={createNewPart}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateTest;
