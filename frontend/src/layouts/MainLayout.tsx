import React from "react";
import { UserMenu } from "@/components/menus/UserMenu";
import { Box, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from "@/components/header/Navbar";

const MainLayout = () => {
  const Logo = styled.div`
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
  `;

  return (
    <Flex direction={"column"} h="100vh">
      {/* <Box bg="white" boxShadow={'md'}> */}
      {/*   <Flex h={16} alignItems={"center"} justifyContent={"space-between"}> */}
      {/*     <Box px={4}> */}
      {/*       <Link to="/"> */}
      {/*         <Logo>EStudy</Logo> */}
      {/*       </Link> */}
      {/*     </Box> */}
      {/*     <Box px={4}> */}
      {/*       <UserMenu /> */}
      {/*     </Box> */}
      {/*   </Flex> */}
      {/* </Box> */}
      <Navbar />
      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default MainLayout;
