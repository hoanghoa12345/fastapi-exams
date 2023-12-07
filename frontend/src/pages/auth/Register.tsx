import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/services/authApi";
import { UserRegister } from "@/types/user";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    confirm_password: false,
  });
  const navigate = useNavigate();
  const toast = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const requestData = Object.fromEntries(formData);
      console.log(requestData);
      const registerData: UserRegister = {
        first_name: requestData.first_name as string,
        last_name: requestData.last_name as string,
        email: requestData.email as string,
        password: requestData.password as string,
        confirm_password: requestData.confirm_password as string,
      };
      const { data, status } = await authApi.register(registerData);
      if (status === 200) {
        if (formRef.current) {
          formRef.current.reset();
        }
        toast({
          title: "Account created",
          description: "You can login now",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Can not register new account by this email");
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box h={"full"} bg={"gray.200"}>
      <Center h={"full"}>
        <Box px={8} py={4} bg={"white"}>
          <Heading as="h2" size={"md"} py={4} textAlign={'center'}>
            Register new account
          </Heading>
          <form onSubmit={handleRegister} ref={formRef}>
            <Stack spacing={2} w={"md"}>
              <Flex columnGap={2}>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input type="text" placeholder="First name" name="first_name" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input type="text" placeholder="Last name" name="last_name" />
                </FormControl>
              </Flex>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Email" name="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" name="password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm Password" name="confirm_password" />
              </FormControl>

              <Button type="submit" colorScheme="teal" width="full" isLoading={isLoading}>
                Register
              </Button>
            </Stack>
          </form>
          <Text mt={4}>
            Already have an account?{" "}
            <ChakraLink as={Link} color="teal.500" to="/login">
              Sign In
            </ChakraLink>
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default RegisterPage;
