import { gql } from '@apollo/client';

export const LatestBlockHeightQuery = gql`
  query LatestBlockHeightListener($offset: Int = 0) {
    height: archway_block(order_by: { height: desc }, limit: 1, offset: $offset) {
      height
    }
  }
`;

export const TxCountSubscription = gql`
  subscription TxCountListener {
    tx: archway_transaction_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const BlocksQuery = gql`
  query Blocks {
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
`;
// export const LatestBlockHeightListenerDocument = gql`
//   subscription LatestBlockHeightListener($offset: Int = 0) {
//     height: block(order_by: { height: desc }, limit: 1, offset: $offset) {
//       height
//     }
//   }
// `;
