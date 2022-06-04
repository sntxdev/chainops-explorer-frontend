// @ts-nocheck
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { Box, Text, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TransactionsTable } from '../../components/Tables/TransactionsTable';

const Query = gql`
  query MyQuery($archwayBlockByPkHeight: bigint!) {
    archway_block_by_pk(height: $archwayBlockByPkHeight) {
      height
      hash
      num_txs
      total_gas
      proposer_address
      timestamp
      transactions {
        gas_used
        gas_wanted
        hash
        height
        messages
        memo
        success
        signatures
        signer_infos
        fee
      }
    }
  }
`;

const BlockDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(Query, {
    variables: { archwayBlockByPkHeight: id },
  });

  const block = data?.archway_block_by_pk;
  useEffect(() => console.log('data:', data), [data]);

  return (
    <>
      <Text mb="22px" fontSize="22px" fontWeight="medium">
        Block {id} details
      </Text>
      {/*Transaction Details Card*/}
      <Box
        p="18px 30px"
        bg="white"
        boxShadow="0 0.1rem 0.2rem 0 rgb(0 0 0 / 16%)"
        borderRadius="5px"
      >
        {block != null ? (
          <Box display="flex" flexDirection="column">
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Chain Id
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                archway chain-id
              </Text>
            </Box>
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Height
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                {block.height}
              </Text>
            </Box>
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Block Time
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                17m ago ( 2022-04-15 01:35:16 )
              </Text>
            </Box>
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Block Hash
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                {block.hash}
              </Text>
            </Box>
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Number of Tx
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                {block.num_txs}
              </Text>
            </Box>
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Gas (used / wanted)
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                {block.total_gas} / ?
              </Text>
            </Box>
            <Box display="inline-flex" mb="15px">
              <Text minWidth="200px" fontWeight="semibold">
                Block Round
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                0
              </Text>
            </Box>
            <Box display="inline-flex">
              <Text minWidth="200px" fontWeight="semibold">
                Proposer
              </Text>
              <Text fontSize="14px" fontWeight="medium">
                {block.proposer_address}
              </Text>
            </Box>
          </Box>
        ) : (
          'Loading...'
        )}
      </Box>
      {/*Txs table*/}
      <Box
        mt="20px"
        p="18px 30px"
        bg="white"
        boxShadow="0 0.1rem 0.2rem 0 rgb(0 0 0 / 16%)"
        borderRadius="5px"
      >
        {block != null ? <TransactionsTable transactions={block.transactions} /> : 'Loading...'}
      </Box>
    </>
  );
};
export default BlockDetailsPage;
