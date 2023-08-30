import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { Part } from "@/types";
import AnswerGroup from "./AnswerGroup";

type Props = {
  data: Part[];
};

function AnswerSheet({ data }: Props) {
  const [timer, setTimer] = useState(7200);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <Box>
      <Flex justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          {formatTime(timer)}
        </Text>
        <Button colorScheme="teal">Submit</Button>
      </Flex>

      {data.map((d, i) => (
        <Box key={i}>
          <Text fontWeight={600}>Part {d.testPart.name}</Text>
          <AnswerGroup part={d} />
        </Box>
      ))}
    </Box>
  );
}

export default AnswerSheet;
