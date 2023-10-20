import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Spinner,
  Center,
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

const useFetch = (path: string, method: string = 'GET') => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setData([]);
    setError(null);
    console.log("fetching");
    fetch(`http://localhost:3002${path}`, {
      method: method
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
      });
  }, []);

  return { isLoading, data, error };
};

function Home({}: Props) {
  const { isLoading } = useFetch('/api/v1/exams');
  return (
    <Box h="full">
      <HStack h="full">
        <VStack w={350} bg="gray.200" minH="full">
          <Box>Left side menu 1</Box>
        </VStack>
        <Box h="full" w="full" overflowY='auto'>
          {isLoading ? (
            <Center h="full">
              <Spinner />
            </Center>
          ) :  <QuestionPanel data={data} />}
        </Box>
      </HStack>
    </Box>
  );
}

export default Home;
/**
 *  <Flex>
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
 */
