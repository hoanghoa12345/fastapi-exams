import React, { useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Avatar, Box, Container, Flex, Skeleton, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { UserMenu } from "@/components/menus/UserMenu";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
type Exam = {
  id: string;
  name: string;
};
const ListTest = () => {
  const { data, isLoading, error } = useFetch<Exam[]>("/api/v1/exams");
  const navigate = useNavigate();
  const userStore = useUserStore();

  const fetchCurrentUser = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      authApi.me(accessToken).then((res) => {
        userStore.setUser(res.data);
      });
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <Container maxW={"3xl"}>
      {isLoading ? (
        <Stack my={4} padding="6" boxShadow="lg" bg="white">
          <Skeleton w={"40%"} h={4} />
          <Skeleton w={"60%"} h={4} />
          <Skeleton w={"60%"} h={4} />
          <Skeleton w={"60%"} h={4} />
        </Stack>
      ) : data && data.length > 0 ? (
        <VStack my={4}>
          {data.map((item: Exam) => (
            <Box role="button" onClick={() => navigate(`/tests/${item.id}`)} key={item.id} p={4} padding="6" boxShadow="lg" bg="white">
              {item.name}
            </Box>
          ))}
        </VStack>
      ) : (
        <Text py={5} textAlign={"center"}>
          No have test
        </Text>
      )}
    </Container>
  );
};

export default ListTest;
