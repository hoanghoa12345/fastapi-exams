import React from "react";
import { Box, Flex, Heading, Input, Button, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <Box h="full">
      <Box h="full" display={{ base: "block", md: "flex" }} alignItems={{ base: "normal", md: "center" }}>
        <Box width={{ base: "full", md: "60%" }} bg="gray.200" minHeight={{ md: "full" }}>
          <Box my={2} px={4} w="full">
            <Heading size="md" color="teal.500">
              English Test
            </Heading>
          </Box>
          <img src="/images/login/working-from-home.svg" alt="login" />
        </Box>

        <Box width={{ base: "full", md: "40%" }} p={{ base: 4, md: 8, lg: 16, xl: 32, "2xl": 36 }}>
          <Heading mb={4} size="md">
            Welcome to{" "}
            <Text as="span" color="teal.500">
              English Test
            </Text>
          </Heading>
          <Text mb={4} fontSize="sm" color="gray.500">
            Please login to continue
          </Text>
          <Input placeholder="Username" variant="outline" mb={4} type="text" />
          <Input placeholder="Password" variant="outline" mb={4} type="password" />
          <Button colorScheme="teal" width="full">
            Sign In
          </Button>
          <ChakraLink as={Link} mt={4} textAlign="end" color="teal.500" to="/forgot-password">
            Forgot Password?
          </ChakraLink>
          <Text mt={4}>
            Don't have an account?{" "}
            <ChakraLink as={Link} color="teal.500" to="/register">
              Create one
            </ChakraLink>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
