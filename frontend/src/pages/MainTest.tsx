import { Box, HStack, VStack, Spinner, Center } from "@chakra-ui/react";

import QuestionPanel from "@/components/questions/QuestionPanel";
import { useFetch } from "@/hooks/useFetch";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Exam } from "@/types";
import ErrorPage from "./ErrorPage";

function MainTest() {
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
        <VStack w={350} bg="gray.100" minH="full">
          <Box>{data?.name}</Box>
          <Link to="/">
            <i className="bx bx-exit" /> Exit
          </Link>
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

export default MainTest;
