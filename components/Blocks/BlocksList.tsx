import { useQuery, useSubscription, gql } from '@apollo/client';
import { BlocksQuery, TxCountSubscription } from '../../graphql';
import React, { useState, useEffect } from 'react';
export const BlocksList = () => {
  const { data, loading, error } = useQuery(BlocksQuery);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>error :(</div>;
  }

  const blocks = data?.archway_block;

  return (
    <div>
      {blocks.map((b: any, idx: any) => (
        <p key={idx}>{b.height}</p>
      ))}
      <LastTx />
    </div>
  );
};

export const LastTx = () => {
  const { data, loading } = useSubscription(TxCountSubscription);
  useEffect(() => console.log(data), [data]);
  const txCount = data?.tx?.aggregate?.count;
  return <div>{txCount}</div>;
};
