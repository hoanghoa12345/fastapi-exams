import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Link as ChakraLink,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authApi } from "@/services/authApi";
import { userRoles } from "@/utils/constants";
import { AxiosError } from "axios";
import { Cookies } from "@/utils/cookie";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async ({ email, password }: z.infer<typeof LoginSchema>) => {
    try {
      setIsLoading(true);
      setSubmitError(null);
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const { data } = await authApi.login(formData);
      if (data.access_token) {
        Cookies.set("token", data.access_token, 90);
        if (data.role === userRoles.ADMIN) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setSubmitError(error.response?.data.detail);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box h="full">
      <Box h="full" display={{ base: "block", md: "flex" }} alignItems={{ base: "normal", md: "center" }}>
        <Box width={{ base: "full", md: "60%" }} bg="gray.200" minHeight={{ md: "full" }}>
          <Box my={2} px={4} w="full">
            <Heading size="md" color="teal.500">
              EStudy
            </Heading>
          </Box>
          <img src="/images/login/working-from-home.svg" alt="login" />
        </Box>

        <Box width={{ base: "full", md: "40%" }} p={{ base: 4, md: 8, lg: 16, xl: 32, "2xl": 36 }}>
          <Heading mb={4} size="md">
            Welcome to{" "}
            <Text as="span" color="teal.500">
              EStudy
            </Text>
          </Heading>
          <Text mb={4} fontSize="sm" color="gray.500">
            Please login to continue
          </Text>
          {submitError ? (
            <Alert fontSize={12} status="error" mb={2}>
              <AlertIcon />
              {JSON.stringify(submitError)}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.email)} mb={4}>
              <Input
                placeholder="Email"
                variant="outline"
                type="email"
                {...register("email")}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)} mb={4}>
              <Input
                placeholder="Password"
                variant="outline"
                type="password"
                {...register("password")}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>
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
