// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { BlocksQuery, TxCountSubscription } from '../../graphql';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar as ChakraAvatar,
  TableContainer,
  Box,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import Avatar from 'boring-avatars';
import { IoCopyOutline } from 'react-icons/io5';
import { formatTime, truncate } from '../../utils';

export const BlocksTable = () => {
  const { data, loading, error } = useQuery(BlocksQuery);

  useEffect(() => console.log(blocks), [blocks]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>error :(</div>;
  }

  const blocks = data?.archway_block;
  const tableRowsData = ['Height', 'Hash', 'Proposer', 'Tx num', 'Time'];

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

        {blocks.map((block: any, idx: any) => {
          const { avatar_url } =
            block.validator?.validator_description || 'https://bit.ly/broken-link';

          return (
            <Tr key={idx} bg="white">
              <Td py="20px">
                <Link href={`/blocks/${block.height}`}>
                  <a style={{ color: '#1F1BE3' }}>{block.height}</a>
                </Link>
              </Td>
              <Td py="20px" display="flex">
                <Text as="span" mr="8px">
                  {truncate(block.hash, 5, 5, 13)}
                </Text>
                <Tooltip label="copy" placement="top-end" closeDelay={100}>
                  <IconButton
                    variant="link"
                    verticalAlign="text-top"
                    icon={<IoCopyOutline />}
                    _hover={{ cursor: 'pointer' }}
                    _focus={{ outline: 'none' }}
                    onClick={() => {
                      navigator.clipboard.writeText(block.hash);
                    }}
                  />
                </Tooltip>
              </Td>
              <Td>
                <Link href={`/validators/${block?.validator?.validator_info?.operator_address}`}>
                  <a className="" style={{ color: '#1F1BE3' }}>
                    <Box display="flex" alignItems="center">
                      {avatar_url ? (
                        <ChakraAvatar src={avatar_url} size="xs" />
                      ) : (
                        <Avatar
                          size={28}
                          name={block?.validator?.validator_description?.moniker}
                          variant="beam"
                          colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                        />
                      )}

                      <Text as="span" ml="12px">
                        {block?.validator?.validator_description?.moniker}
                      </Text>
                    </Box>
                  </a>
                </Link>
              </Td>
              <Td py="20px">{block.num_txs}</Td>
              <Td>{formatTime(block.timestamp)}</Td>
            </Tr>
          );
        })}
      </Table>
    </TableContainer>
  );
};
