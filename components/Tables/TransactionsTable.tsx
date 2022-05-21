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
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { formatTime, truncate } from '../../utils';
import { IoCopyOutline } from 'react-icons/io5';

const tableRowsData = ['Tx Hash', 'Type', 'Status', 'Amount'];

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
                <Td py="10px" display="flex">
                  <Text>{truncate(t.hash, 7, 5, 16)}</Text>
                  <Tooltip label="copy" placement="top-end" closeDelay={100}>
                    <IconButton
                      variant="link"
                      verticalAlign="text-top"
                      icon={<IoCopyOutline />}
                      _hover={{ cursor: 'pointer' }}
                      _focus={{ outline: 'none' }}
                      onClick={() => {
                        navigator.clipboard.writeText(t.hash);
                      }}
                      aria-label=""
                    />
                  </Tooltip>
                </Td>
                <Td py="1px">{t.messages[0]['@type'].split('.').slice(-1)[0]}</Td>
                <Td py="1px">
                  {t.success ? <Text color="green">Success</Text> : <Text color="red">Fail</Text>}
                </Td>
                <Td py="1px">?</Td>
                <Td py="1px" textTransform="uppercase" textAlign="right">
                  {t.fee?.amount[0]?.amount || 0}
                  <Text as="span" fontSize="12px">
                    {' '}
                    {t.fee?.amount[0]?.denom}
                  </Text>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
};
