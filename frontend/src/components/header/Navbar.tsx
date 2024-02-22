import { site } from "@/utils/constants";
import {
  Flex,
  HStack,
  Button,
  Box,
  IconButton,
  CloseButton,
  VStack,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { UserMenu } from "../menus/UserMenu";
import { Link as RouterLink } from "react-router-dom";

const menuItems = [
  {
    title: "Learning Path",
    href: "/learning-path",
  },
  {
    title: "Tests",
    href: "/tests",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md">
        <Container maxWidth="container.xl">
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              <chakra.a as={RouterLink} to="/" title={site.title} display="flex" alignItems="center">
                <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                  {site.title}
                </chakra.h1>
                <VisuallyHidden>{site.title}</VisuallyHidden>
              </chakra.a>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack
                spacing={1}
                mr={1}
                color="brand.500"
                display={{
                  base: "none",
                  md: "inline-flex",
                }}>
                {menuItems.map((item) => (
                  <Button as={RouterLink} to={item.href} variant="ghost" key={item.title}>
                    {item.title}
                  </Button>
                ))}
                <UserMenu />
              </HStack>
              <Box
                display={{
                  base: "inline-flex",
                  md: "none",
                }}>
                <IconButton
                  display={{
                    base: "flex",
                    md: "none",
                  }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{
                    color: "inherit",
                  }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />

                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={2}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                  zIndex={10}>
                  <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />

                  {menuItems.map((item) => (
                    <Button as={RouterLink} to={item.href} w="full" variant="ghost" key={item.title}>
                      {item.title}
                    </Button>
                  ))}
                  <UserMenu />
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </Container>
      </chakra.header>
    </React.Fragment>
  );
};

export default Navbar;
