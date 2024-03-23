import { useFetch } from "@/hooks/useFetch";
import { Box, Container, Image, Skeleton, Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { FILE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ExamAPI } from "@/services/web/examApi";
import { Exam } from "@/types";

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
    object-fit: cover;
    background-color: #f5f5f5;
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
    -webkit-line-clamp: 2;
  }
`;

const ListTest = () => {
  // const { data, isLoading, error } = useFetch<Exam[]>("/v1/exams");
  const [data, setData] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await ExamAPI.getAll();
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

  return (
    <Container maxW={"4xl"}>
      {isLoading ? (
        <Stack my={4} padding="6" boxShadow="lg" bg="white">
          <Skeleton w={"40%"} h={4} />
          <Skeleton w={"60%"} h={4} />
          <Skeleton w={"60%"} h={4} />
          <Skeleton w={"60%"} h={4} />
        </Stack>
      ) : data && data.length > 0 ? (
        <SimpleGrid my={8} columns={{ base: 1, md: 2, lg: 3 }} spacing={6} placeItems="center">
          {data.map((item: Exam) => (
            <CardTopicTest role="button" onClick={() => navigate(`/tests/${item.id}`)} key={item.id}>
              <Image
                className="topic__image"
                w="100%"
                h="100%"
                objectFit="cover"
                src={`${FILE_URL}${item.thumbnail_path}`}
                alt={item.name}
              />
              <Box py={3} px={2}>
                <Text className="topic__name" fontSize={"inherit"} fontWeight={"bold"} minH="2rem">
                  {item.name}
                </Text>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack>
                    <Text fontSize={"sm"} textColor={"gray.600"} fontWeight={"bold"}>
                      0/200
                    </Text>
                    <Text fontSize={"sm"} textColor={"gray.600"}>
                      Attempted
                    </Text>
                  </Stack>
                  <Stack>
                    <Text fontSize={"sm"} textColor={"gray.600"} fontWeight={"bold"}>
                      0
                    </Text>
                    <Text fontSize={"sm"} textColor={"gray.600"}>
                      Participants
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </CardTopicTest>
          ))}
        </SimpleGrid>
      ) : data?.length === 0 || error ? (
        <Text py={5} textAlign={"center"}>
          No have test
        </Text>
      ) : null}
    </Container>
  );
};

export default ListTest;
