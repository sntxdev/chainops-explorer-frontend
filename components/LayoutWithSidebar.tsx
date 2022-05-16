import React, { ReactNode } from 'react';
import { ReactText } from 'react';
import { useRouter } from 'next/router';

import NextLink from 'next/link';
import { IconType } from 'react-icons';

import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { GiAtom } from 'react-icons/gi';
import { ImHome, ImChrome } from 'react-icons/im';
import { BsGridFill } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import {
  IoSettingsSharp,
  IoWallet,
  IoBarChart,
  IoLogoGithub,
  IoLogoTwitter,
} from 'react-icons/io5';

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
} from '@chakra-ui/react';
import { NetworksMenuModal } from './NetworksMenu';
import { Search } from './Search';

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', to: '/', icon: ImHome },
  { name: 'Blocks', to: '/blocks', icon: BsGridFill },
  // { name: "Transactions", to: "/transactions", icon: IoWallet },
  { name: 'Validators', to: '/validators', icon: IoSettingsSharp },
  { name: 'Governance', to: '/governance', icon: IoBarChart },
  { name: 'Staking', to: '/staking', icon: IoBarChart },
];

const socialsLinkItems: Array<LinkItemProps> = [
  { name: 'Telegram', to: 'https://t.me/ChainOps', icon: FaTelegramPlane },
  {
    name: 'Github',
    to: 'https://github.com/chainops-org/',
    icon: IoLogoGithub,
  },
  { name: 'Website', to: '/12', icon: ImChrome },
  { name: 'Twitter', to: '/34', icon: IoLogoTwitter },
  // { name: "Medium", to: "/validators", icon: IoLogoMedium },
];

export function LayoutWithSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('#F8F8F8', 'gray.900')}>
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
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />

      {/* Header */}
      <Header onOpen={onOpen} />

      {/* Page content */}
      <Box ml={{ base: 0, md: '282px' }} px="4">
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
      bg={useColorModeValue('white', 'gray.900')}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: '282px' }}
      pos="fixed"
      h="full"
      boxShadow="sm"
      {...rest}
    >
      <Flex h="20" mb="24px" alignItems="center" mx="8" justifyContent="space-between">
        {/*Logo*/}
        <Text pl="28px" fontSize="2xl" fontWeight="bold">
          CHAINOPS
        </Text>

        {/*Close drawer button */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
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
      <Text pl="60px" mb="20px" fontSize="14px" fontWeight="medium" color="#6E6B7B">
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
  const router = useRouter();
  const isActive = router.pathname === '/';
  return (
    <NextLink href={to} passHref>
      <ChakraLink
        style={{
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '500',
        }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          pl="60px"
          role="group"
          cursor="pointer"
          borderRight="4px"
          transition="background 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)"
          bg={router.pathname == to ? 'brand.accentLight' : 'transparent'}
          borderColor={router.pathname == to ? 'brand.accent' : 'transparent'}
          color={router.pathname == to ? 'brand.accent' : 'brand.primaryBlack'}
          fontWeight={router.pathname == to ? 'bold' : 'medium'}
          _hover={{
            bg: 'brand.accentLight',
            // fontWeight: 'bold',
            color: '#9127E3',
            borderColor: 'brand.accent',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: '#9127E3',
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
      ml={{ base: 0, md: '282px' }}
      px={{ base: 4, md: 4 }}
      py="30px"
      alignItems="center"
      bg={useColorModeValue('transparent', 'gray.900')}
      {...rest}
    >
      {/*BURGER MENU ICONButton*/}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <NetworksMenuModal />

      {/*SEARCH */}
      <Search />
    </Flex>
  );
};
