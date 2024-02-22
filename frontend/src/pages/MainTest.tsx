import { Box, HStack, VStack, Spinner, Center, Text, Stack, Progress, Skeleton, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import styled from "@emotion/styled";

import QuestionPanel from "@/components/questions/QuestionPanel";
import { useFetch } from "@/hooks/useFetch";
import { Exam } from "@/types";
import ErrorPage from "./ErrorPage";
import { ExamAPI } from "@/services/web/examApi";

const QuestionPalette = styled.div`

  .tab__heading {
    background-color: #fafafb;
    padding: 0.5rem 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: 600;
    text-transform: uppercase;
    max-width: 120px;
    width: 100%;
  }

  .tab__content {
    background-color: #fff;
    min-height: 400px;
    width: 300px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

function MainTest() {
  const { testId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  // const { isLoading, data, error } = useFetch<Exam>(`/api/v1/exams/${testId}`);

  const [data, setData] = useState<Exam>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const { data } = await ExamAPI.getById(String(testId));
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (error) return <ErrorPage />;

  const setTabActive = (index: number) => {
    setSearchParams({ part: index.toString() });
  };

  return (
    <Box h="full" bg="#f2f3f7">
      <HStack h="full">
        < VStack w={450} minH="full" >
          <Box py={4}>
            <Text fontSize="2xl" fontWeight="bold" sx={{ textTransform: "uppercase" }}>{data?.name}</Text>
          </Box>
          <Box>
            <QuestionPalette>
              <Box className="tab__heading" >{data?.name}</Box>
              <Box className="tab__content" display="flex" flexDir="column" px={4} py={4}>
                <Text>Question Palette</Text>
                {isLoading ? (<VStack spacing={2} align="left">
                  <Skeleton width="80%" h={4} />
                  <Skeleton width="full" h={4} />
                  <Skeleton width="60%" h={4} />
                  <Skeleton width="80%" h={4} />
                  <Skeleton width="full" h={4} />
                  <Skeleton width="60%" h={4} />
                  <Skeleton width="80%" h={4} />
                  <Skeleton width="full" h={4} />
                  <Skeleton width="60%" h={4} />
                  <Skeleton width="80%" h={4} />
                  <Skeleton width="full" h={4} />
                  <Skeleton width="60%" h={4} />
                </VStack>) : (
                  <Box overflowY="auto" h="full" maxH={300} flex={1}>
                    {data && data.parts.map((part) => (
                      <Box key={part.id}>
                        <Text fontWeight="bold" py={2}>{part.name}</Text>
                        <Flex flexWrap="wrap" gap={2} py={2}>
                          {part.question_groups.map((questionGroup) => questionGroup.questions.map((question, index) => (
                            <Box key={question.id} bg="gray.100" px={3} py={1.5} borderRadius={8} cursor="pointer">
                              <Text fontSize="sm" fontWeight="bold" textColor="blackAlpha.600">{index}</Text>
                            </Box>)))}
                        </Flex>
                      </Box>
                    ))}
                  </Box>)}
                <HStack>
                  <Progress w="full" bgColor={'blackAlpha.200'} borderRadius={8} value={3} colorScheme="green" size="sm" />
                  <Text fontSize="sm" fontWeight="bold">-/200</Text>
                </HStack>
              </Box>
            </QuestionPalette>
          </Box>
        </VStack >
        <Box h="full" w="full" overflowY="auto" bg="white">
          {isLoading ? (
            <Center h="full">
              <Spinner />
            </Center>
          ) : data ? (
            <QuestionPanel data={data} activeTab={Number(searchParams.get("part")) || 1} onTabChange={setTabActive} />
          ) : null}
        </Box>
      </HStack >
    </Box >
  );
}

export default MainTest;
