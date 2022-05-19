import React from 'react';
import { Badge, Box, Button, Divider, Flex, Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';

export const ProposalCard = () => {
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Flex alignItems="center">
          <Text as="span">#17</Text>
          <Badge variant="solid" ml="4" p="4px 18px" as="span" colorScheme="green">
            ✓ Passed
          </Badge>
        </Flex>
        <Link href={`/governance/17`} key={1}>
          <Button>Show</Button>
        </Link>
      </HStack>

      <Text my="16px" fontSize="18px" fontWeight="500">
        Upgrade core v1.1.0
      </Text>
      <Divider bg="black" />

      <Box mt="32px" mb="16px">
        <Text fontSize="16px" fontWeight="600">
          Proposer
        </Text>
        <Text fontFamily="Work Sans" fontSize="16px" fontWeight="300">
          archway1fltce97v6352r5l6jc8e25lpsl07nc2nkqrmnu
        </Text>
      </Box>
      <Flex mb="16px">
        <Box width="50%">
          <Text fontSize="16px" fontWeight="600">
            Submit time
          </Text>
          <Text fontFamily="Work Sans" fontSize="16px" fontWeight="300">
            Apr 25, 2022 (15 days ago)
          </Text>
        </Box>
        <Box width="50%">
          <Text fontSize="16px" fontWeight="600">
            Voting end
          </Text>
          <Text fontFamily="Work Sans" fontSize="16px" fontWeight="300">
            Apr 28, 2022 (13 days ago)
          </Text>
        </Box>
      </Flex>
      <Box m="0px">
        <Text fontSize="16px" fontWeight="600">
          Results
        </Text>
        <Text fontFamily="Work Sans" fontSize="16px" fontWeight="300">
          Most voted on 🟢 Yes 100.00%
        </Text>
      </Box>
    </Box>
  );
};
