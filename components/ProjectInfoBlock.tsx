import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';

export const ProjectInfoBlock = () => {
  return (
    <SimpleGrid columns={2} spacing={4} height="270px">
      <Flex
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="https://archway.io" isExternal>
          Website
        </Link>
      </Flex>
      <Flex
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="https://docs.archway.io/" isExternal>
          Documentation
        </Link>
      </Flex>
      <Flex
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="https://discord.gg/5FVvx3WGfa" isExternal>
          Discord
        </Link>
      </Flex>
      <Flex
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="https://github.com/archway-network" isExternal>
          Github
        </Link>
      </Flex>
      <Flex
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="https://twitter.com/archwayhq" isExternal>
          Twitter
        </Link>
      </Flex>
      <Flex
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="https://blog.archway.io/" isExternal>
          Medium
        </Link>
      </Flex>
    </SimpleGrid>
  );
};
