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

export const DelegatorsTable = () => {
  // const { data, loading, error } = useQuery(ValidatorsQuery);
  // useEffect(() => console.log('data2', data), [data]);
  //
  // if (loading) {
  //   return <div>loading...</div>;
  // }
  //
  // if (error) {
  //   console.error(error);
  //   return <div>error :(</div>;
  // }

  // const validators = data?.archway_validator;
  const tableRowsData = ['Address', 'Amount'];

  return (
    <TableContainer borderRadius="8px">
      <Table variant="simple">
        <Thead background="brand.accentLight">
          <Tr>
            {tableRowsData.map((item, idx) => (
              <Th
                key={idx}
                py="18px"
                fontSize="14px"
                fontWeight="bold"
                color="brand.primaryBlack"
                isNumeric={item == 'Amount' ? true : false}
              >
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody fontSize="16px" fontWeight="medium">
          <Tr bg="white">
            <Td>bcna1eyrh5yc7l8spdrausd5xc4tg0ruxrc60q8se9j</Td>
            <Td isNumeric>1,360,020 TORII</Td>
          </Tr>
          <Tr bg="white">
            <Td>bcna18sfsljlc34tkc0cza22jfqrakk3ju56tncd07e</Td>
            <Td isNumeric>1,263,407 TORII</Td>
          </Tr>
          <Tr bg="white">
            <Td>bcna1wdr9wdl2x7a8s4926jwpz32gt9vtykf4yzvxtx</Td>
            <Td isNumeric>1,001,397 TORII</Td>
          </Tr>
          <Tr bg="white">
            <Td>bcna16qf0qc0cf6g6u8zjm95s9pzh647gyljj38wdt3</Td>
            <Td isNumeric>750,000 TORII</Td>
          </Tr>
          <Tr bg="white">
            <Td>bcna13zv80wzv0x9drchzldynjnp24j6fz760h3mf6y</Td>
            <Td isNumeric>500,000 TORII</Td>
          </Tr>
          <Tr bg="white">
            <Td>bcna18wvcvg8hr6xt5l76nsufdwx0zuejcshf5sn2zh</Td>
            <Td isNumeric>268,002 TORII</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
