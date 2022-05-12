import React from 'react';
import { Box, Stack, HStack, VStack } from '@chakra-ui/react';
import { ProposalCard } from './ProposalCard';
import Link from 'next/link';

export const ProposalsList = () => {
  return (
    <HStack spacing="24px">
      <Box
        width="50%"
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        p="30px 28px"
      >
        <ProposalCard />
      </Box>
      <Box
        width="50%"
        bg="white"
        borderRadius="10"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        p="30px 28px"
      >
        <ProposalCard />
      </Box>
    </HStack>
  );
};

// <Link href={`/governance/123`} key={2}>
//     <a>
//         <ProposalCard />
//     </a>
// </Link>
// <Link href={`/governance/123`} key={1}>
//     <a>
//         <ProposalCard />
//     </a>
// </Link>
