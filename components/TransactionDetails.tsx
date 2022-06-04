import React from 'react';
import { Box, Text, Heading, Link, Button, SimpleGrid } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from './table';
import NextLink from 'next/link';

const TransactionDetails = ({ hash }: any) => {
  return (
    <div>
      {/*Tx details*/}
      <SimpleGrid
        columns={2}
        spacing={12}
        height="236px"
        bg="white"
        borderRadius="10"
        p="24px"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
      >
        <Box display="flex" justifyContent="space-between">
          <Text>Hash</Text>
          <Text>CC76FDF55192B6FFDA855B6E95BB900213ED5E73B5AC924D8F35B799707E51EC</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Height</Text>
          <Text>3,345,424</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Time</Text>
          <Text>May 24, 2022 12:41:52 AM (GMT+3)</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Fee</Text>
          <Text>0.008 TORII</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Result</Text>
          <Text>Success</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Memo</Text>
          <Text></Text>
        </Box>
      </SimpleGrid>

      {/*Messages*/}
      <Box
        mt="24px"
        bg="white"
        borderRadius="10"
        p="24px"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
      >
        <Text>Messages</Text>
        {/*Message*/}
        <Box>
          <Text>Delegate</Text>
          <Box>
            <Box display="flex">
              <Text width="300px">Delegator address</Text>
              <Text>archway1uy6s37mq4dhxsms86f06wz28dt8p83f2qt9zr0</Text>
            </Box>
            <Box display="flex">
              <Text width="300px">Validator address</Text>
              <Text>archwayvaloper1qe8uuf5x69c526h4nzxwv4ltftr73v7q2gsrku</Text>
            </Box>
            <Box display="flex">
              <Text width="300px">Amount</Text>
              <Text>13.000000 torii</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default TransactionDetails;
// <p>Details {hash}</p>
// <Table variant="striped" colorScheme="gray" size="md">
//   <Tbody fontSize="14px" fontWeight="500">
//     <Tr>
//       <Td>prop</Td>
//       <Td>val</Td>
//     </Tr>
//     <Tr>
//       <Td>prop</Td>
//       <Td>val</Td>
//     </Tr>
//     <Tr>
//       <Td>prop</Td>
//       <Td>val</Td>
//     </Tr>
//   </Tbody>
// </Table>
