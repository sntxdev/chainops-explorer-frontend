import { useRouter } from 'next/router';
import ClientOnly from '../../components/ClientOnly';
import { ValidatorDetails } from '../../components/Validators/ValidatorDetails';

const ValidatorDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ClientOnly>
      <ValidatorDetails valoperAddress={id} />
    </ClientOnly>
  );
};

export default ValidatorDetailPage;
