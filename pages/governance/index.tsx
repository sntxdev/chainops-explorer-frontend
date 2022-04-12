import { Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { GovernanceCard } from '../../components';

const Governance = () => {
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Governance
      </Text>
      <SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>
        <GovernanceCard />
        <GovernanceCard />
        <GovernanceCard />
        <GovernanceCard />
        <GovernanceCard />
        <GovernanceCard />
      </SimpleGrid>
    </>
  );
};

export default Governance;
