import { BlocksTable } from '../../components';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { gql } from '@apollo/client';
import client from '../../utils/apolloClient';

export default function Test({ gqlBlocks }: any) {
  return (
    <div>
      {gqlBlocks.map((block: any) => (
        <div key={block.height}>{block.height}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        archway_block(limit: 10, order_by: { height: desc }) {
          hash
          height
          num_txs
          timestamp
          transactions {
            hash
            height
            fee
            gas_used
            gas_wanted
          }
        }
      }
    `,
  });

  return {
    props: {
      gqlBlocks: data.archway_block,
    },
  };
}
