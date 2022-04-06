import { BlocksTable } from "../../components";
import React, { useState, useEffect } from "react";

const Blocks = ({ env }: any) => {
  const [allBlocks, setAllBlocks] = useState([]);
  useEffect(() => {
    getBlocks();
    console.log("Blocks Page", allBlocks);
  }, [setAllBlocks]);

  const getBlocks = async () => {
    const res = await fetch(env.API_URL);
    const data = await res.json();
    setAllBlocks(data);
  };

  return (
    <>
      <BlocksTable data={allBlocks} wssUrl={env.WSS_URL} />
    </>
  );
};

export default Blocks;

export async function getServerSideProps() {
  const env = {
    API_URL: `${process.env.API_URL}`,
    WSS_URL: `${process.env.WSS_URL}`,
  };
  return {
    props: { env },
  };
}
