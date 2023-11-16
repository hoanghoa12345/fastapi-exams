import React, { useState } from "react";
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
  IconButton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Question } from "@/types";
import { PencilIcon, ChevronUpDownIcon } from "../icons";
import { ExamApi } from "@/services/getExams";

interface QuestionGroupCardProps {
  id: string;
  title: string;
  questions: Question[];
  onAddQuestion: () => void;
}

const QuestionGroupCard: React.FC<QuestionGroupCardProps> = ({id, title, questions, onAddQuestion }) => {
  const [titleEditable, setTitleEditable] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(title || "");
  const toast = useToast();

  const handleEditTitle = async () => {
    if (!titleEditable) {
      setTitleEditable(true);
    } else {
      try {
        const res = await ExamApi.updateQuestionGroup(id, {
          name: titleValue,
        });
        if (res.status == 200) {
          toast({
            title: "Updated",
            description: "Updated title question group",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error updating title question group",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setTitleEditable(false);
      }
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <HStack>
          <Heading as="h4" size="sm">
            {titleEditable ? <Input value={titleValue} onChange={(e) => handleChangeTitle(e)} /> : titleValue || "-"}
          </Heading>
          <IconButton onClick={handleEditTitle} aria-label="Edit question group title" icon={<PencilIcon width={24} height={24} />} />
        </HStack>
        <Button colorScheme="teal" onClick={onAddQuestion}>
          Add New Question
        </Button>
      </Flex>
      <VStack mt="4" spacing="4">
        {questions.map((question) => (
          <Box key={question.id} borderWidth="1px" borderRadius="lg" p="4">
            <HStack>
              <IconButton variant="ghost" aria-label="Move question" icon={<ChevronUpDownIcon width={20} height={20} />} />
              <Text>{question.title}</Text>
              <IconButton variant="ghost" aria-label="Edit question" icon={<PencilIcon width={20} height={20} />} />
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default QuestionGroupCard;
