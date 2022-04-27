import ClientOnly from '../../components/ClientOnly';
import { Skeleton, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { BlocksTable } from '../../components/Tables/BlocksTable';
import DataBlocks from '../../components/DataBlocks';

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Blocks
      </Text>
      <ClientOnly>
        <BlocksTable />
      </ClientOnly>
    </>
  );
};

// <Stack>
//       {[...Array(20)].map((item, idx) => (
//           <Skeleton height="50px" startColor="#fff" endColor="#e3e3e3" key={idx} />
//       ))}
//     </Stack>
