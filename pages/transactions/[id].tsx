import { useRouter } from 'next/router';
import ClientOnly from '../../components/ClientOnly';
import TransactionDetails from '../../components/TransactionDetails';

const TransactionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ClientOnly>
      <p>Transaction Details</p>
      <TransactionDetails hash={id} />
    </ClientOnly>
  );
};

export default TransactionDetailPage;
