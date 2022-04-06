import { BlocksTable } from "../../components";
import React, { useState, useEffect } from "react";

const Blocks = () => {
  const [allBlocks, setAllBlocks] = useState([]);
  useEffect(() => {
    getBlocks();
    console.log("Blocks Page", allBlocks);
    console.log(process.env.NEXT_PUBLIC_API_URL);
  }, [setAllBlocks]);

  const getBlocks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    const data = await res.json();
    setAllBlocks(data);
  };

  return (
    <>
      <BlocksTable data={allBlocks} wssUrl={process.env.NEXT_PUBLIC_WSS_URL} />
    </>
  );
};

export default Blocks;

// export async function getServerSideProps() {
//   const env = {
//     API_URL: `${process.env.API_URL}`,
//     WSS_URL: `${process.env.WSS_URL}`,
//   };
//   return {
//     props: { env },
//   };
// }
