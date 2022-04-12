import { BlocksTable } from '../../components';
import React, { useState, useEffect } from 'react';
import { Skeleton, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';

const Blocks = (props: any) => {
  const [allBlocks, setAllBlocks] = useState([]);

  useEffect(() => {
    // Delay for table skeleton show
    setTimeout(function () {
      getBlocks();
    }, 500);
    console.log('Blocks Page', allBlocks);

    // getBlocks();
    console.log(process.env.NEXT_PUBLIC_API_URL);
  }, [setAllBlocks]);

  const getBlocks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blocks`);
    const data = await res.json();
    setAllBlocks(data);
  };

  console.log('props: ', props);
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Blocks
      </Text>
      {allBlocks.length > 0 ? (
        <BlocksTable data={allBlocks} wssUrl={process.env.NEXT_PUBLIC_WSS_URL} />
      ) : (
        <Stack>
          {[...Array(20)].map((item, idx) => (
            <Skeleton height="50px" startColor="#fff" endColor="#e3e3e3" key={idx} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Blocks;
