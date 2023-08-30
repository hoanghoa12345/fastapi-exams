import React from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

import AnswerSheet from "@/components/answers/AnswerSheet";
import QuestionPanel from "@/components/questions/QuestionPanel";
import LeftSidebar from "@/components/left-sidebar/LeftSidebar";

type Props = {};

const data = [
  {
    testPart: {
      name: "1",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
  {
    testPart: {
      name: "2",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
  {
    testPart: {
      name: "3",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
  {
    testPart: {
      name: "4",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
  {
    testPart: {
      name: "5",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
  {
    testPart: {
      name: "6",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
  {
    testPart: {
      name: "7",
      items: [
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
        {
          question: "question",
          answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        },
      ],
    },
  },
];

function Home({}: Props) {
  
  return (
    <Flex>
      <Box bg="gray.50" w="400px" p={4}>
       <LeftSidebar/>
      </Box>
      <Box flex={1} px={2} py={4} minH="100vh">        
       <QuestionPanel data={data} />
      </Box>
      <Box w="400px" p={2} bg={"gray.50"}>
        <AnswerSheet data={data} />
      </Box>
    </Flex>
  );
}

export default Home;
