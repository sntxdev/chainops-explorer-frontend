import { useRouter } from "next/router";

const Block = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Block {id}</div>;
};
export default Block;
