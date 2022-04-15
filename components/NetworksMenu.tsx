import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Image,
  useDisclosure,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import React from 'react';

const testnets = [
  {
    title: 'Archway',
    imgUrl: 'https://archway.explorers.guru/chains/archway.svg',
  },
  {
    title: 'Kyve',
    imgUrl: 'https://backend.nodes.guru/assets/fde1ba29-135a-4292-a37a-7b13061936a3',
  },
  {
    title: 'AssetMantle',
    imgUrl: 'https://docs.assetmantle.one/assets/images/AssetMantle_Logo_Square.png',
  },
  {
    title: 'Idep',
    imgUrl: 'https://docs.idep.network/img/idep2bg.svg',
  },

  {
    title: 'Nym',
    imgUrl: 'https://nym.explorers.guru/chains/nym.svg',
  },
];
export const NetworksMenuModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        onClick={onOpen}
        mr="22px"
        p="16px 44px"
        justifyContent={'center'}
        bg="brand.accent"
        borderRadius="8px"
        _hover={{ cursor: 'pointer' }}
      >
        <Image src="https://archway.explorers.guru/chains/archway.svg" boxSize="25px" />
        <Text m="0 40px 0 12px !important " fontSize="16px" fontWeight="medium" color="white">
          Archway
        </Text>

        <Box display={{ base: 'none', md: 'flex' }}>
          <FiChevronDown fill="white" stroke={'white'} />
        </Box>
      </HStack>
      <Modal isCentered onClose={onClose} isOpen={isOpen} size="xl" motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent p="12px">
          <ModalHeader>Choose Network</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Mainnets</Text>
            <SimpleGrid columns={3} spacing={2}>
              {testnets.map((network, idx) => (
                <HStack
                  key={idx}
                  p="12px"
                  bg="#f5f5f5"
                  borderRadius="10px"
                  _hover={{ cursor: 'pointer' }}
                >
                  <Image src={network.imgUrl} boxSize="25px" />
                  <Text>{network.title}</Text>
                </HStack>
              ))}
            </SimpleGrid>

            {/*Testnets*/}
            <Text mt="20px">Testnets</Text>
            <SimpleGrid columns={3} spacing={2}>
              {testnets.map((network, idx) => (
                <HStack
                  key={idx}
                  p="12px"
                  bg="#f5f5f5"
                  borderRadius="10px"
                  _hover={{ cursor: 'pointer' }}
                >
                  <Image src={network.imgUrl} boxSize="25px" />
                  <Text>{network.title}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
