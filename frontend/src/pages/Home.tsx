import React, { useEffect, useState } from "react";
import { Heading, Box, Flex, Text, HStack, VStack, Spinner, Center } from "@chakra-ui/react";

import AnswerSheet from "@/components/answers/AnswerSheet";
import QuestionPanel from "@/components/questions/QuestionPanel";
import LeftSidebar from "@/components/left-sidebar/LeftSidebar";
import { useFetch } from "@/hooks/useFetch";
import { Navigate, useParams, useSearchParams, Link } from "react-router-dom";
import { Exam } from "@/types";
import ErrorPage from "./ErrorPage";

function Home() {
  const { testId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, data, error } = useFetch<Exam>(`/api/v1/exams/${testId}`);
  if (error) return <ErrorPage />;

  const setTabActive = (index: number) => {
    setSearchParams({ part: index.toString() });
  };

  return (
    <Box h="full">
      <HStack h="full">
        <VStack w={350} bg="gray.200" minH="full">
          <Box>{data?.name}</Box>
          <Link to="/"><i className='bx bx-exit'/> Exit</Link>
        </VStack>
        <Box h="full" w="full" overflowY="auto">
          {isLoading ? (
            <Center h="full">
              <Spinner />
            </Center>
          ) : data ? (
            <QuestionPanel data={data} activeTab={Number(searchParams.get("part")) || 1} onTabChange={setTabActive} />
          ) : null}
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
