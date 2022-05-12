import { Text, Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { ProposalsList } from '../../components/Governance/ProposalsList';
import { ProposalsTable } from '../../components/Governance/ProposalsTable';

const Governance = () => {
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Governance
      </Text>
      <ProposalsList />
      <ProposalsTable />
    </>
  );
};

export default Governance;
