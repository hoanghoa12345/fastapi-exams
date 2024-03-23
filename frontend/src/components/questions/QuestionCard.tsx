import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Radio,
  RadioGroup,
  VStack,
  Checkbox,
  CheckboxGroup,
  Box,
  Image,
} from "@chakra-ui/react";
import { Question } from "@/types";
type Props = {
  question: Question;
};

function QuestionCard({ question }: Props) {
  const answerStr = ["A", "B", "C", "D"];
  const [value, setValue] = React.useState("0");
  return (
    <Box>
      <VStack alignItems="start" ms={8}>
        {question.title && (
          <Text fontSize={16} my={4} fontWeight={500}>
            {question.question_index}. {question.title}
          </Text>
        )}
        {question.image && (
          <VStack align="center">
            <Image src={question.image} alt="" />
          </VStack>
        )}
        <RadioGroup onChange={setValue} value={value} colorScheme="blue">
          <Stack direction="column">
            {question.answers.map((answer) => (
              <Radio
                sx={{
                  w: 25,
                  h: 25,
                  borderRadius: 8,
                  ["&[data-checked]:before"]: {
                    borderRadius: 8,
                  },
                }}
                key={answer.id}
                value={answer.id}>
                <Text fontSize={"md"}>
                  ({answerStr[answer.answer_index || 0]}) {answer.title}
                </Text>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </VStack>
    </Box>
  );
}

export default QuestionCard;
