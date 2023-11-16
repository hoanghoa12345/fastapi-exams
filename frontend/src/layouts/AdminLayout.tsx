import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HStack, VStack, Box, Flex, Spacer, Text, Button, Stack, Divider, Heading, IconButton, Icon, Avatar } from "@chakra-ui/react";
const AdminLayout = () => {
  const navigate = useNavigate()
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/create-test",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={24}
          height={24}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "Create Test",
      path: "/admin/create-test",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

      ),
    },
  ];
  return (
    <Box h="full">
      <HStack h="full">
        <VStack w={300} minH="full" spacing={2}>
          <Box py={8}>
            <Stack justifyContent="center" alignItems="center">
              <Avatar size="md" name="User" />
              <Text>Admin User</Text>
            </Stack>
          </Box>
          <Divider />
          <VStack py={4} flex={1}>
            {menuItems.map((item, index) => (
              <Box
                key={index}
                px={2}
                py={2}
                cursor="pointer"
                display="flex"
                gap={2}
                _hover={{ backgroundColor: "gray.200" }}
                w="full"
                rounded="md" role="button" onClick={() => navigate(item.path)}>
                {item.icon}
                <Text>{item.name}</Text>
              </Box>
            ))}
          </VStack>
          <Divider />
          <VStack py={4}>
            <Button variant='outline' w='full'>Logout</Button>
          </VStack>
        </VStack>
        <Divider orientation="vertical" />
        <Box h="full" w="full" overflowY="auto">
          <Outlet />
        </Box>
      </HStack>
    </Box>
  );
};

export default AdminLayout;
