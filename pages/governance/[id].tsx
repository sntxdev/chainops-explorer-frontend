import { useRouter } from 'next/router';
import { Text, Heading, Flex, Spacer } from '@chakra-ui/react';
import { ProposalDetails } from '../../components/Governance/ProposalDetails';

// eslint-disable-next-line react/display-name
export default () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Heading as="h2">Proposal {id} details</Heading>
      <ProposalDetails proposal={proposal} />
    </>
  );
};

const proposal = {
  id: '17',
  title: 'Upgrade core v1.1.0',
  status: 'Passed',
  proposer: 'coming soon',
  submitTime: 'Apr 25, 2022 5:31 PM',
  depositEnd: 'Apr 28, 2022 5:31 PM',
  votingStart: 'Apr 25, 2022 5:47 PM\n',
  votingEnd: 'Apr 28, 2022 5:47 PM\n',
  totalDeposit: '100,000.000000utori',
  details:
    'Software Upgrade to v1.1.0\n' +
    '\n' +
    'This proposal is required to adopt version 1.1.0.\n' +
    'All node operators must follow the upgrade procedure detailed in the PR.\n' +
    '\n' +
    'This upgrade notably introduces fixes and improvements to the Beam module enabling the rewards and reviews capabilities on the Lum Network.\n' +
    '\n' +
    'It is scheduled for block 1960300 which should land on Apr. 28 around 17:00 UTC.\n' +
    '\n' +
    'PR: https://github.com/lum-network/chain/pull/9\n' +
    '\n' +
    'List of changes (full list available on Github):\n' +
    '- Cosmos v0.45.0 upgrade\n' +
    '- Beam auto-close feature fix\n' +
    '- Beam creation date fix\n' +
    '- Keplr REST endpoints fix\n' +
    '- Indirect dependencies fix for MapOfZones\n' +
    '- Bumped golang version to 1.18',
};
