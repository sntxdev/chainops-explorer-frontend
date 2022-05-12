import { Text, Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { GovernanceCard } from '../../components';
import Link from 'next/link';
import { HorizontalBarChart } from '../../components/Charts';
import { ProposalsList } from '../../components/Governance/ProposalsList';
import ProposalsTable from '../../components/Governance/ProposalsTable';

const Governance = () => {
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Governance
      </Text>

      <ProposalsList />

      <ProposalsTable />

      <HorizontalBarChart />

      {/*<SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>*/}
      {/*  {[...Array(6)].map((e, i) => (*/}
      {/*    <Link href={`/governance/123`} key={i}>*/}
      {/*      <a>*/}
      {/*        <GovernanceCard />*/}
      {/*      </a>*/}
      {/*    </Link>*/}
      {/*  ))}*/}
      {/*</SimpleGrid>*/}
    </>
  );
};

export default Governance;
