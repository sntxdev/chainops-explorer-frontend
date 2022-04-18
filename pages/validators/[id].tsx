import { useRouter } from 'next/router';
import { ValidatorDetails } from '../../components/Validators/ValidatorDetails';

// eslint-disable-next-line react/display-name
export default () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ValidatorDetails />
    </>
  );
};
