import React, { useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Avatar, Box, Container, Flex, Image, Skeleton, Spinner, Stack, Text, VStack, Grid } from "@chakra-ui/react";
import { UserMenu } from "@/components/menus/UserMenu";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
import styled from "@emotion/styled";

const CardTopicTest = styled.div`
  border-radius: 0.75rem;
  background-color: #fff;
  box-shadow: 0px 15px 30px rgba(95, 73, 118, 0.1);
  overflow: hidden;
  width: 16rem;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }

  .topic__image {
    width: 100%;
    height: 10rem;
    transition: transform 0.2s ease-in-out;
    filter: brightness(0.8);
    &:hover {
      transform: scale(1.05);
    }
  }

  .topic__name {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2
  }
`;

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
        <Grid my={8} templateColumns="repeat(3, 1fr)" gap={6}>
          {data.map((item: Exam) => (
            <CardTopicTest
              role="button"
              onClick={() => navigate(`/tests/${item.id}`)}
              key={item.id}>
              <Image className="topic__image" w="100%" h="100%" objectFit="cover" src="https://picsum.photos/300" alt="" />
              <Box py={3} px={2}>
                <Text className="topic__name" fontSize={"inherit"} fontWeight={"bold"} minH="2rem">
                  {item.name}
                </Text>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack>
                    <Text fontSize={"sm"} textColor={'gray.600'} fontWeight={"bold"}>
                      0/200
                    </Text>
                    <Text fontSize={"sm"} textColor={'gray.600'}>Attempted</Text>
                  </Stack>
                  <Stack>
                    <Text fontSize={"sm"} textColor={'gray.600'} fontWeight={"bold"}>
                      0
                    </Text>
                    <Text fontSize={"sm"} textColor={'gray.600'}>Participants</Text>
                  </Stack>
                </Stack>
              </Box>
            </CardTopicTest>
          ))}
        </Grid>
      ) : (
        <Text py={5} textAlign={"center"}>
          No have test
        </Text>
      )}
    </Container>
  );
};

export default ListTest;
