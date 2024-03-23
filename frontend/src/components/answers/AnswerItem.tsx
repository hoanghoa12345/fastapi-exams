import React from "react";
import { Box, Flex, Radio, RadioGroup, Spacer, Text } from "@chakra-ui/react";

type Props = {
  items: Question;
  index: number;
  setValue: (nextValue: string) => void;
  value: string;
};

type Question = {
  question: String;
  answers: String[];
};

function AnswerItem({ items, index, setValue, value }: Props) {
//   const [value, setValue] = React.useState("");
  return (
    <Box px={4} py={4}>
      <RadioGroup onChange={setValue} value={value}>
        <Flex>
          <Text fontSize={"md"}>{index + 1}.</Text>
          <Spacer />
          {items.answers.map((_, index) => (
            <React.Fragment key={index}>
              <Radio value={(index + 1).toString()}>
                {(index + 10).toString(36).toUpperCase()}
              </Radio>
              <Spacer />
            </React.Fragment>
          ))}
        </Flex>
      </RadioGroup>
    </Box>
  );
}

export default AnswerItem;
