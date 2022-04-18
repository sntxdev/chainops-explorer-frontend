// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box } from '@chakra-ui/react';
import { validatorsData } from '../../utils/validatorsData';
import { formatTime, truncate } from '../../utils';

export const ValidatorsTable = ({ data }: any) => {
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    setValidators(validatorsData);
  }, []);

  useEffect(() => console.log(validators), []);

  const tableRowsData = ['Rank', 'Validator', 'Total stake', 'Uptime', 'Commission'];
  // @ts-ignore
  return (
    <TableContainer borderRadius="8px">
      <Table variant="simple">
        <Thead background="brand.accentLight">
          <Tr>
            {tableRowsData.map((item, idx) => (
              <Th key={idx} py="34px" fontSize="14px" fontWeight="bold" color="brand.primaryBlack">
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody fontSize="16px" fontWeight="medium">
          {validators
            .sort((a, b) => a.rank - b.rank)
            .map((validator, idx) => (
              <Tr key={idx} bg="white">
                <Td py="20px">{validator.rank}</Td>
                <Td py="20px">
                  <Link href={`/validators/${validator.operator_address}`}>
                    <a style={{ color: '#1F1BE3' }}>{validator.moniker}</a>
                  </Link>
                </Td>
                <Td py="20px">{validator.tokens}</Td>
                <Td py="20px">{validator.uptime.over_blocks}%</Td>
                <Td py="20px">{validator.rate}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
