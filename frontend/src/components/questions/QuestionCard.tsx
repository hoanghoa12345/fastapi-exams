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
} from "@chakra-ui/react";
import { Question } from "@/types";
type Props = {
  question: Question;
};

function QuestionCard({ question }: Props) {
  const [value, setValue] = React.useState('0');
  return (
    <section>
      <div>
        <Text fontSize={16} my={4} fontWeight={500}>{question.title}</Text>
        <RadioGroup onChange={setValue} value={value} >
          <Stack direction="column">
            {question.answers.map((answer) => (
              <Radio key={answer.id} value={answer.id}><Text fontSize={'md'}>{answer.title}</Text></Radio>
            ))}
          </Stack>
        </RadioGroup>
      </div>
    </section>
  );
}

export default QuestionCard;
