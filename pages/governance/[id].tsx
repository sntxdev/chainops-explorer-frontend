import { useRouter } from 'next/router';

const ProposalDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>Proposal {id} details</div>
    </>
  );
};
export default ProposalDetails;
