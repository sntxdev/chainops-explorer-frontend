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
import { AiOutlineUser } from 'react-icons/ai';

export const ValidatorsTable = ({ isActive }) => {
  const { data, loading, error } = useQuery(ValidatorsQuery, {
    variables: {
      activeStatus: isActive ? 3 : 1,
    },
  });
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
              <Td width="100px" py="20px">
                {idx + 1}
              </Td>
              <Td py="20px">
                <Link href={`/validators/${validator.validator_info?.operator_address}`}>
                  <a display="block" style={{ color: '#1F1BE3' }}>
                    <Box display="flex" alignItems="center">
                      {validator.validator_description?.avatar_url ? (
                        <Avatar src={validator.validator_description?.avatar_url} size="sm" />
                      ) : (
                        <Avatar
                          size="sm"
                          color="black"
                          bg="red.100"
                          icon={<AiOutlineUser fontSize="1rem" />}
                        />
                      )}

                      <Text as="span" ml="16px" fontWeight="400">
                        {validator.validator_description?.moniker}
                      </Text>
                    </Box>
                  </a>
                </Link>
              </Td>
              <Td py="20px">{validator?.validator_voting_power?.voting_power || 'n/a'}</Td>
              <Td py="20px">{validator.uptime?.over_blocks || '100%'}</Td>
              <Td py="20px">{parseFloat(validator.validator_info?.max_rate) * 100}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
