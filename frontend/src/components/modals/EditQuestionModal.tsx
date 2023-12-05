import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Answer, Question } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initData?: Question;
}

const EditQuestionModal = ({ isOpen, onClose, onSubmit, initData }: ModalProps) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const toast = useToast();

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].title = value;
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (index: number) => {
    setCorrectAnswerIndex(index === correctAnswerIndex ? null : index);
  };

  const handleAddNewQuestion = () => {
    setAnswers([...answers, { id: "", title: "", question_id: initData?.id || "" }]);
  };

  const handleSubmit = () => {
    // Perform validation
    if (!questionTitle.trim() || answers.some((answer) => !answer.title.trim()) || correctAnswerIndex === null) {
      // Handle validation error
      toast({
        title: "Form validation",
        description: "Form validation failed!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Submit the form data
    onSubmit({
      question: questionTitle,
      answers: answers,
      questionId: initData?.id,
      correctAnswerIndex: correctAnswerIndex,
    });

    // Close the modal
    onClose();
  };

  useEffect(() => {
    if (initData) {
      setQuestionTitle(initData.title);
      setAnswers(initData.answers);
      // setCorrectAnswerIndex(initData.correctAnswerIndex);
    }
  }, [initData?.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit a Question</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Question Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your question here"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
          </FormControl>

          <FormLabel>Answers</FormLabel>
          <Stack spacing={2}>
            {answers.map((answer, index) => (
              <FormControl key={index} isRequired>
                <Input
                  type="text"
                  placeholder={`Enter answer ${index + 1}`}
                  value={answer.title}
                  onChange={(e: any) => handleAnswerChange(index, e.target.value)}
                />
                <Checkbox py={2} isChecked={index === correctAnswerIndex} onChange={() => handleCheckboxChange(index)}>
                  Correct Answer
                </Checkbox>
              </FormControl>
            ))}
            {answers.length < 4 ? <Button onClick={handleAddNewQuestion}>Add new answers</Button> : null}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditQuestionModal;
