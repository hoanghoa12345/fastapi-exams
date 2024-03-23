import React, { useState } from "react";
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
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreateQuestionModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (index: number) => {
    setCorrectAnswerIndex(index === correctAnswerIndex ? null : index);
  };

  const handleSubmit = () => {
    // Perform validation
    if (!question.trim() || answers.some((answer) => !answer.trim()) || correctAnswerIndex === null) {
      // Handle validation error
      console.error("Form validation failed!");
      return;
    }

    // Submit the form data
    onSubmit({
      question,
      answers,
      correctAnswerIndex,
    });

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Question</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Question Name</FormLabel>
            <Input type="text" placeholder="Enter your question here" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </FormControl>

          <FormLabel>Answers</FormLabel>
          <Stack spacing={2}>
            {answers.map((answer, index) => (
              <FormControl key={index} isRequired>
                <Input
                  type="text"
                  placeholder={`Enter answer ${index + 1}`}
                  value={answer}
                  onChange={(e: any) => handleAnswerChange(index, e.target.value)}
                />
                <Checkbox isChecked={index === correctAnswerIndex} onChange={() => handleCheckboxChange(index)}>
                  Correct Answer
                </Checkbox>
              </FormControl>
            ))}
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

export default CreateQuestionModal;
