import { useUserStore } from "@/stores/useUserStore";
import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Card,
  Image,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Button,
  Avatar,
  Flex,
  CardHeader,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";

const ProfilePage = () => {
  const userStore = useUserStore();
  const { user } = userStore;
  return (
    <Box bg={"gray.100"} h="full">
      <Container maxW={"4xl"}>
        <Heading as="h3" size={"md"} p="4">
          Account Setting
        </Heading>

        <Box bg={"white"} borderRadius={16} p={4}>
          <Tabs orientation="vertical" variant="soft-rounded" colorScheme="blue">
            <TabList w={"8rem"}>
              <Tab>My Profile</Tab>
              <Tab>Security</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <Heading mx={4} as="h3" size={"md"}>
                    My Profile
                  </Heading>
                  <VStack p={4}>
                    <Card w={"full"} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline">
                      <CardHeader>
                        <Avatar size={"lg"} name={user?.first_name} />
                      </CardHeader>
                      <CardBody>
                        <Stack ml={3}>
                          <Text fontWeight={"semibold"}>
                            {user?.first_name} {user?.last_name}
                          </Text>
                          <Text fontSize={"sm"} textColor={"gray.500"}>
                            {user?.role}
                          </Text>
                          <Text fontSize={"sm"} textColor={"gray.500"}>
                            {user?.email}
                          </Text>
                        </Stack>
                      </CardBody>
                      <CardFooter>Edit</CardFooter>
                    </Card>
                    <Card w={"full"} overflow="hidden" variant="outline">
                      <Flex>
                        <CardHeader flex={1}>
                          <Heading mx={4} as="h4" size={"md"}>
                            Personal Information
                          </Heading>
                        </CardHeader>
                          <CardFooter>Edit</CardFooter>
                      </Flex>
                      <CardBody>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                          <GridItem w="100%">
                            <Text fontWeight={'semibold'} textColor={'gray.500'}>First Name</Text>
                            <Text>{user?.first_name}</Text>
                          </GridItem>
                          <GridItem w="100%">
                            <Text fontWeight={'semibold'} textColor={'gray.500'}>Last Name</Text>
                            <Text>{user?.last_name}</Text>
                          </GridItem>
                          <GridItem w="100%">
                            <Text fontWeight={'semibold'} textColor={'gray.500'}>Email</Text>
                            <Text>{user?.email}</Text>
                          </GridItem>
                          <GridItem w="100%">
                            <Text fontWeight={'semibold'} textColor={'gray.500'}>Phone</Text>
                            <Text>{user?.phone ?? '-'}</Text>
                          </GridItem>
                        </Grid>
                      </CardBody>
                    </Card>
                  </VStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <VStack>
                  <Heading>Password</Heading>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
