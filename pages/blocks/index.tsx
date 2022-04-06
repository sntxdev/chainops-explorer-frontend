import { BlocksTable } from "../../components";
import React, { useState, useEffect } from "react";
//@
const Blocks = ({ data }: any) => {
  const [allBlocks, setAllBlocks] = useState([]);
  useEffect(() => {
    getBlocks();

    console.log("Blocks Page", allBlocks);
  }, [setAllBlocks]);

  const getBlocks = async () => {
    // Fetch data from external API
    const API_URL = "https://chainops-explorer-frontend.vercel.app/api/hello";
    // const API_URL = `http://localhost:3000/api/hello`;
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
    // Pass data to the page via props
    // return { props: { data } };
    setAllBlocks(data);
  };

  return (
    <h1>
      <BlocksTable data={allBlocks} />
    </h1>
  );
};

// This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const API_URL = "https://chainops-explorer-frontend.vercel.app/api/hello";
//   // const API_URL = `http://localhost:3000/api/hello`
//   const res = await fetch(API_URL);
//   const data = await res.json();
//   console.log(data);
//   // Pass data to the page via props
//   // return { props: { data } };
//   return data
// }

export default Blocks;
