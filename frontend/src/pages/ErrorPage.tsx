import { Box, Button, Heading, Text } from "@chakra-ui/react";
import imageSrc from "@/assets/page_not_found.svg";
import { useRouteError, useNavigate } from "react-router-dom";
import { Kbd, Code } from "@chakra-ui/react";
const ErrorPage = () => {
  let error: any = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <Box w="full" h="full" display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box display="flex" alignItems="center" flexDirection="column">
        {/* <img src="/images/shared/404-banner.png" alt="404 not found" width={300} height={300} /> */}
        <Heading size={"3xl"}>404</Heading>
        <Text fontSize={"lg"} fontWeight={400} textAlign={"center"} py={4} color="gray.800">
          Sorry, an unexpected error has occurred.
        </Text>
        <Text fontSize="sm" color="red.500">
          {error?.message}
        </Text>
        {import.meta.env.DEV ? (
          <Box maxWidth="6xl">
            <Code children={error?.stack} />
          </Box>
        ) : null}

        {/* <Text fontSize="sm" color="gray.400" textAlign={"center"}>
          You can try to <Kbd>F5</Kbd> the page.
        </Text> */}
        <Button colorScheme="blue" onClick={handleGoHome}>
          Go home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
