// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { ValidatorsQuery } from '../../graphql';

export const ValidatorsTable = () => {
  const { data, loading, error } = useQuery(ValidatorsQuery);
  useEffect(() => console.log('data2', data), [data]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>error :(</div>;
  }

  const validators = data?.archway_validator;
  const tableRowsData = ['Rank', 'Validator', 'Total stake', 'Uptime', 'Commission'];

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
          {validators?.map((validator, idx) => (
            <Tr key={idx} bg="white">
              <Td py="20px">{validator.rank || 'n/a'}</Td>
              <Td py="20px">
                <Link href={`/validators/${validator.validator_info?.operator_address}`}>
                  <a style={{ color: '#1F1BE3' }}>
                    <Avatar
                      src={
                        validator.validator_description?.avatar_url || 'https://bit.ly/broken-link'
                      }
                      size="xs"
                    />
                    <Text as="span" ml="12px">
                      {validator.validator_description?.moniker}
                    </Text>
                  </a>
                </Link>
              </Td>
              <Td py="20px">{validator.tokens || 'n/a'}</Td>
              <Td py="20px">{validator.uptime?.over_blocks || 'n/a'}%</Td>
              <Td py="20px">{parseFloat(validator.validator_info.max_rate) * 100}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
