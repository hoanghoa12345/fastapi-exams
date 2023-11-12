import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  VStack,
  Text,
  Input,
  Image,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Question } from '@/types';

interface QuestionGroupCardProps {
  title: string;
  questions: Question[];
  onAddQuestion: () => void;
}

const QuestionGroupCard: React.FC<QuestionGroupCardProps> = ({
  title,
  questions,
  onAddQuestion,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h4" size="sm">
          {title}
        </Heading>
        <Button colorScheme="teal" onClick={onAddQuestion}>
          Add New Question
        </Button>
      </Flex>
      <VStack mt="4" spacing="4">
        {questions.map((question) => (
          <Box key={question.id} borderWidth="1px" borderRadius="lg" p="4">
            <Text>{question.title}</Text>
            {/* Add image and file upload components here */}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default QuestionGroupCard;