import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';

const items = [
  { title: 'Website', url: 'https://archway.io' },
  { title: 'Documentation', url: 'https://docs.archway.io/' },
  { title: 'Github', url: 'https://github.com/archway-network' },
  { title: 'Discord', url: 'https://discord.gg/5FVvx3WGfa' },
  { title: 'Twitter', url: 'https://twitter.com/archwayhq' },
  { title: 'Medium', url: 'https://blog.archway.io/' },
];

export const ProjectInfoBlock = () => {
  return (
    <SimpleGrid columns={2} spacing={4} height="270px">
      {items.map((item, idx) => (
        <Link
          isExternal
          href={item.url}
          key={idx}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="white"
          borderRadius="10"
          boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        >
          {item.title}
        </Link>
      ))}
    </SimpleGrid>
  );
};
