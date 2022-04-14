import { useRouter } from 'next/router';

const ValidatorDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>Validator {id} details</div>
    </>
  );
};
export default ValidatorDetails;
