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
  items: Question;
};

function QuestionCard({ items }: Props) {
  const [value, setValue] = React.useState('0');
  return (
    <section>
      <div>
        <Text fontSize={16} my={4} fontWeight={600}>{items.question}</Text>
        <RadioGroup onChange={setValue} value={value} >
          <Stack direction="column">
            {items.answers.map((answer, index) => (
              <Radio key={index} value={(index + 1).toString()}><span>{answer}</span></Radio>
            ))}
          </Stack>
        </RadioGroup>
      </div>
    </section>
  );
}

export default QuestionCard;
