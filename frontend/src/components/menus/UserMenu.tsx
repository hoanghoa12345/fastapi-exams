import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Avatar } from "@chakra-ui/react";

export const UserMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Avatar name="User" size="md" />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
