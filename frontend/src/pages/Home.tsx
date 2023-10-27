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
import { useFetch } from "@/hooks/useFetch";
import { Navigate, useParams } from "react-router-dom";
import { Exam } from "@/types";
import ErrorPage from "./ErrorPage";

function Home() {
  const {testId} = useParams();
  const { isLoading, data, error } = useFetch<Exam>(`/api/v1/exams/${testId}`);
  if(error) return <ErrorPage/>;
//   if (isLoading) return <div><Spinner/></div>;
//   if (error) return <div>Error: {error?.message}
  
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
          ) : data ? <QuestionPanel data={data} /> : null}
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
