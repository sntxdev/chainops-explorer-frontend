import Link from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import React from 'react';
import { formatTime, truncate } from '../../utils';

const tableRowsData = ['Tx Hash', 'Type', 'Result', 'Amount'];

export const TransactionsTable = ({ transactions }: any) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableRowsData.map((item, idx) => (
              <Th key={idx} py="18px" fontSize="14px" fontWeight="bold" color="brand.primaryBlack">
                {item}
              </Th>
            ))}
            <Th
              py="18px"
              fontSize="14px"
              fontWeight="bold"
              color="brand.primaryBlack"
              textAlign="right"
            >
              Fee
            </Th>
          </Tr>
        </Thead>
        <Tbody fontWeight="medium">
          {
            // @ts-ignore
            transactions.map((t, i) => (
              <Tr key={i} fontSize="15px">
                <Td py="10px">{truncate(t.hash, 5, 5, 13)}</Td>
                <Td py="1px">{t.messages[0]['@type']}</Td>
                <Td py="1px">{t.status.toString()}</Td>
                <Td py="1px">?</Td>
                <Td py="1px" textTransform="uppercase" textAlign="right">
                  {t.fee != 'NaN' ? t.fee : '0 AUGUST'}
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
};
