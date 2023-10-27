import { useFetch } from "@/hooks/useFetch";
import {
  Box,
  Container,
  Flex,
  Skeleton,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
type Exam = {
  id: string;
  name: string;
};
const ListTest = () => {
  const { data, isLoading, error } = useFetch<Exam[]>("/api/v1/exams");
  // if (isLoading) return <div><Spinner/></div>;
  // if (error) return <div>Error: {error?.message}</div>
  const navigate = useNavigate();
  console.log(isLoading);

  return (
    <Box>
      <Box bg={"gray.100"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box px={4}>Logo</Box>
          <Box px={4}>User</Box>
        </Flex>
      </Box>
      <Container maxW={"3xl"}>
        {isLoading ? (
          <Stack my={4} padding="6" boxShadow="lg" bg="white">
            <Skeleton w={"40%"} h={4} />
            <Skeleton w={"60%"} h={4} />
            <Skeleton w={"60%"} h={4} />
            <Skeleton w={"60%"} h={4} />
          </Stack>
        ) : data ? (
          <VStack>
            {data.map((item: Exam) => (
              <Box
                role="button"
                onClick={() => navigate(`/tests/${item.id}`)}
                key={item.id}
                p={4}
                padding="6"
                boxShadow="lg"
                bg="white"
              >
                {item.name}
              </Box>
            ))}
          </VStack>
        ) : null}
      </Container>
    </Box>
  );
};

export default ListTest;
