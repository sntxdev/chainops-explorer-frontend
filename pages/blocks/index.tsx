import { BlocksTable } from '../../components';
import React, { useState, useEffect, createContext, useContext } from 'react';
import client from '../../utils/apolloClient';
import ClientOnly from '../../components/ClientOnly';
import { useQuery, gql } from '@apollo/client';
import { Skeleton, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { BlocksList, LastTx } from '../../components/Blocks/BlocksList';

// eslint-disable-next-line react/display-name
export default (props: any) => {
  const [allBlocks, setAllBlocks] = useState([]);

  // useEffect(() => {
  //   setAllBlocks(props.gqlBlocks);
  //
  //   console.log(props);
  // }, [setAllBlocks]);

  // const getBlocks = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blocks`);
  //   const data = await res.json();
  //   setAllBlocks(data);
  // };

  // useEffect(() => console.log('data: ', data), [data]);

  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Blocks
      </Text>
      <ClientOnly>
        <BlocksList />
      </ClientOnly>
    </>
  );
};
//
// {props?.gqlBlocks.length > 0 ? (
//     <BlocksTable data={blocks} wssUrl={process.env.NEXT_PUBLIC_WSS_URL} />
// ) : (
//     <Stack>
//       {[...Array(20)].map((item, idx) => (
//           <Skeleton height="50px" startColor="#fff" endColor="#e3e3e3" key={idx} />
//       ))}
//     </Stack>
// )}

//
// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: gql`
//       query MyQuery {
//         archway_block(limit: 10, order_by: { height: desc }) {
//           hash
//           height
//           num_txs
//           timestamp
//           transactions {
//             hash
//             height
//             fee
//             gas_used
//             gas_wanted
//           }
//         }
//       }
//     `,
//   });
//
//   return {
//     props: {
//       gqlBlocks: data.archway_block,
//     },
//   };
// }
