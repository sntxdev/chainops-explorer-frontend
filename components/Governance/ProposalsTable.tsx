import * as React from 'react';
import NextLink from 'next/link';
import { Box, Text, Heading, Link, Button } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '../table';
// https://codesandbox.io/s/j51cd
// ProposalTable.css imported in _app.tsx

export const ProposalsTable = () => {
  return (
    <Box
      mt="22px"
      bg="white"
      borderRadius="10"
      boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
      p="22px 24px"
    >
      <Text my="12px" fontSize="28px" fontFamily="Work Sans">
        All Proposals
      </Text>
      <Table variant="striped" colorScheme="gray" size="md">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th>Submit time</Th>
            <Th>Voting start</Th>
            <Th>Total deposit</Th>
          </Tr>
        </Thead>
        <Tbody fontSize="14px" fontWeight="500">
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>

          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
          <Tr>
            <Td>#17</Td>
            <Td>
              <NextLink href={`/governance/17`} key={1}>
                <Link color="teal.500"> Upgrade core v1.1.0</Link>
              </NextLink>
            </Td>
            <Td>Passed</Td>
            <Td>15 days ago</Td>
            <Td>15 days ago</Td>
            <Td>100,000.000000utori</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
