import React from 'react';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';
import { HorizontalBarChart } from '../Charts';

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
      <Box w="100%" mt="24px" p="24px" bg="#f2f6fd" borderRadius="15px">
        <Text fontWeight="600">Total: 534,702,907.306000 utori</Text>
        <HorizontalBarChart />
        <Flex fontFamily="Work Sans">
          <Box flex="0 0 auto" width="25%" px="12px" borderLeft="3px solid #9fe6b9">
            <Text mb="4px" fontSize="16px" fontWeight="600">
              Yes
            </Text>
            <Text mb="4px" fontSize="15px">
              64.77%
            </Text>
            <Text fontSize="15px" fontWeight="500">
              437,877,946.098280 <span style={{ color: '#98bbff' }}> utori</span>
            </Text>
          </Box>
          <Box flex="0 0 auto" width="25%" px="12px" borderLeft="3px solid #ff8686">
            <Text mb="4px" fontSize="16px" fontWeight="600">
              No
            </Text>
            <Text mb="4px" fontSize="15px">
              5%
            </Text>
            <Text fontSize="15px" fontWeight="500">
              180,630.395656 <span style={{ color: '#98bbff' }}> utori</span>
            </Text>
          </Box>
          <Box flex="0 0 auto" width="25%" px="12px" borderLeft="3px solid #ffd029">
            <Text mb="4px" fontSize="16px" fontWeight="600">
              No with veto
            </Text>
            <Text mb="4px" fontSize="15px">
              1%
            </Text>
            <Text fontSize="15px" fontWeight="500">
              437,877,946.098280 <span style={{ color: '#98bbff' }}> utori</span>
            </Text>
          </Box>
          <Box flex="0 0 auto" width="25%" px="12px" borderLeft="3px solid #e3e3e3">
            <Text mb="4px" fontSize="16px" fontWeight="600">
              Abstain
            </Text>
            <Text mb="4px" fontSize="15px">
              29.23%
            </Text>
            <Text fontSize="15px" fontWeight="500">
              437,877,946.098280 <span style={{ color: '#98bbff' }}> utori</span>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
