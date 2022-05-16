import { useRouter } from 'next/router';
import ClientOnly from '../../components/ClientOnly';
import { ValidatorDetails } from '../../components/Validators/ValidatorDetails';

const TransactionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ClientOnly>
      <p>tx {id} details</p>
      {/*<ValidatorDetails valoperAddress={id} />*/}
    </ClientOnly>
  );
};

export default TransactionDetailPage;
