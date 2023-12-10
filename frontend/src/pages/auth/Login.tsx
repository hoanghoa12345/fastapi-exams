import React from "react";
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
import { authApi } from "@/services/authApi";
import { userRoles } from "@/utils/constants";
import { AxiosError } from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const { data } = await authApi.login(formData);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setSuccess("Login successful");
        if (data.role === userRoles.ADMIN) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError("Invalid email or password");
      if (error instanceof AxiosError) {
        setError(error.response?.data.detail);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsInvalid({
      ...isInvalid,
      email: event.target.value.trim() === "",
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsInvalid({
      ...isInvalid,
      password: event.target.value.trim() === "",
    });
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
          {error ? (
            <Alert status="error" mb={2}>
              <AlertIcon />
              {Array.isArray(error) ? error.map((e) => <React.Fragment key={e.type}>{e.msg}</React.Fragment>) : error}
            </Alert>
          ) : null}
          <form onSubmit={handleLogin}>
            <FormControl isInvalid={isInvalid.email} mb={4}>
              <Input
                placeholder="Email"
                variant="outline"
                type="email"
                onChange={handleEmailChange}
                value={email}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                autoFocus
                required
                minLength={5}
                maxLength={50}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address"
              />
              <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isInvalid.password} mb={4}>
              <Input
                placeholder="Password"
                variant="outline"
                type="password"
                onChange={handlePasswordChange}
                value={password}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                required
                minLength={5}
                maxLength={50}
                title="Please enter a valid password"
              />
              <FormErrorMessage>Please enter a valid password</FormErrorMessage>
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
