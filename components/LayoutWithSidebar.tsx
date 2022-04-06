import React, { ReactNode } from "react";
import NextLink from "next/link";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { GiAtom } from "react-icons/gi";
import { ImHome, ImChrome } from "react-icons/im";
import { BsGridFill } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

import {
  IoSettingsSharp,
  IoWallet,
  IoBarChart,
  IoLogoGithub,
  IoLogoTwitter,
} from "react-icons/io5";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", to: "/", icon: ImHome },
  { name: "Blocks", to: "/blocks", icon: BsGridFill },
  { name: "Transactions", to: "/transactions", icon: IoWallet },
  { name: "Validators", to: "/validators", icon: IoSettingsSharp },
  { name: "Governance", to: "/governance", icon: IoBarChart },
];

const socialsLinkItems: Array<LinkItemProps> = [
  { name: "Telegram", to: "/", icon: FaTelegramPlane },
  { name: "Github", to: "/blocks", icon: IoLogoGithub },
  { name: "Website", to: "/transactions", icon: ImChrome },
  { name: "Twitter", to: "/governance", icon: IoLogoTwitter },
  // { name: "Medium", to: "/validators", icon: IoLogoMedium },
];

export function LayoutWithSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("#F8F8F8", "gray.900")}>
      {/*Drawer mobile*/}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/*Sidebar*/}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />

      {/* Header */}
      <Header onOpen={onOpen} />

      {/* Page content */}
      <Box ml={{ base: 0, md: "282px" }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "282px" }}
      pos="fixed"
      h="full"
      boxShadow="sm"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/*Logo*/}
        <Text pl="28px" fontSize="2xl" fontWeight="bold">
          CHAINOPS
        </Text>

        {/*Close drawer button */}
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {/*Sidenav menu*/}
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}

      {/*Social networks menu*/}
      <NavSocials />
    </Box>
  );
};

const NavSocials = () => {
  return (
    <Box mt="80px">
      <Text
        pl="60px"
        mb="20px"
        fontSize="14px"
        fontWeight="medium"
        color="#6E6B7B"
      >
        LINKS
      </Text>
      {socialsLinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  to: string;
}
const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => {
  return (
    <NextLink href={to} passHref>
      <ChakraLink
        style={{
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "500",
        }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          pl="60px"
          role="group"
          cursor="pointer"
          borderRight="4px"
          fontWeight="medium"
          borderColor="transparent"
          transition="background 0.32s ease"
          _hover={{
            bg: "#ECE0F5",
            fontWeight: "bold",
            color: "#9127E3",
            borderRight: "4px",
            borderColor: "#9127E3",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "#9127E3",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </ChakraLink>
    </NextLink>
  );
};

interface HeaderProps extends FlexProps {
  onOpen: () => void;
}
const Header = ({ onOpen, ...rest }: HeaderProps) => {
  return (
    <Flex
      ml={{ base: 0, md: "282px" }}
      px={{ base: 4, md: 4 }}
      py="30px"
      alignItems="center"
      // bg={useColorModeValue("white", "gray.900")}
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      // justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      {/*BURGER MENU ICONButton*/}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/*SELECT NETWORK MENU*/}
      <HStack spacing={{ base: "0", md: "6" }} mr="40px">
        <Flex alignItems={"center"} w="252px" bg="#9127E3" borderRadius="md">
          <Menu>
            <MenuButton
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
              w="100%"
              py="14px"
            >
              <HStack justifyContent={"center"}>
                <GiAtom fill="white" size="18px" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="18px" fontWeight="medium" color="white">
                    Archway
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown fill="white" stroke={"white"} />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Cosmos</MenuItem>
              <MenuItem>BitCanna</MenuItem>
              <MenuItem>Kyve</MenuItem>
              <MenuDivider />
              <MenuItem>SubQuery</MenuItem>
              <MenuItem>Acala</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>

      {/*SEARCH */}
      <Input
        height="56px"
        borderRadius="md"
        boxShadow="sm"
        bg="fff"
        border="0"
        focusBorderColor="none"
        placeholder="Search transaction, address or go to block #"
        _placeholder={{ color: "#D3D3D3" }}
        w="100%"
      />
    </Flex>
  );
};
