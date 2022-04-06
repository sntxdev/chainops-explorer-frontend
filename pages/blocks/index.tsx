import { BlocksTable } from "../../components";
import React, { useState, useEffect } from "react";

const Blocks = ({ env }: any) => {
  const [allBlocks, setAllBlocks] = useState([]);
  useEffect(() => {
    getBlocks();
    console.log("Blocks Page", allBlocks);
  }, [setAllBlocks]);

  const getBlocks = async () => {
    // костыль для vercel, убрать при переезде на дев сервер
    const url =
      env.API_URL !== undefined
        ? env.API_URL
        : "https://chainops-explorer-frontend.vercel.app/api/hello";
    const res = await fetch(url);
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
