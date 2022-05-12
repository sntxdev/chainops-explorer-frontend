import React from 'react';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';

export const ProposalDetails = ({ proposal }: any) => {
  return (
    <Flex
      mt="22px"
      flexWrap="wrap"
      bg="white"
      borderRadius="10"
      boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
      p="22px 24px"
    >
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Title</Text>
        <Text fontFamily="Work Sans">{proposal.title}</Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Id</Text>
        <Text fontFamily="Work Sans">{proposal.id}</Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Status</Text>
        <Text fontWeight="500" fontSize="15px">
          {proposal.status}
        </Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Proposer</Text>
        <Text fontFamily="Work Sans">{proposal.proposer}</Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Submit time</Text>
        <Text fontFamily="Work Sans">{proposal.submitTime}</Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Deposit end</Text>
        <Text fontFamily="Work Sans">{proposal.depositEnd}</Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Voting start</Text>
        <Text fontFamily="Work Sans">{proposal.votingStart}</Text>
      </Box>
      <Box w="50%" mt="24px">
        <Text fontWeight="600">Voting end</Text>
        <Text fontFamily="Work Sans" fontSize="15px">
          {proposal.votingEnd}
        </Text>
      </Box>
      <Box w="100%" mt="24px">
        <Text fontWeight="600">Total deposit</Text>
        <Text fontFamily="Work Sans">{proposal.totalDeposit}</Text>
      </Box>
      <Box w="70%" mt="24px">
        <Text fontWeight="600">Details</Text>
        <Text fontFamily="Work Sans">{proposal.details}</Text>
      </Box>
    </Flex>
  );
};
