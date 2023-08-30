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
  const [value, setValue] = React.useState("1");
  return (
    <Card my={2}>
      <CardBody>
        <Text my={4} fontWeight={600}>{items.question}</Text>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column">
            {items.answers.map((answer, index) => (
              <Radio checked={false} key={index} value={(index + 1).toString()}>{answer}</Radio>
            ))}
          </Stack>
        </RadioGroup>
      </CardBody>
    </Card>
  );
}

export default QuestionCard;
