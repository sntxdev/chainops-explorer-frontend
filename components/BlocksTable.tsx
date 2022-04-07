// @ts-nocheck
import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

import { formatTime } from "../utils/formatTime";

export const BlocksTable = ({ data }: any) => {
  const [socketUrl, setSocketUrl] = useState(
    // "ws://194.163.167.188:8000/archway"
    "wss://explorer.chainops.org/ws/archway"
  );

  const [blocks, setBlocks] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    socketUrl,
    {
      onOpen: () => sendMessage("{}"),
    }
  );

  useEffect(() => {
    setAllBlocks(data);
  }, [data]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);

      if (data.hasOwnProperty("block")) {
        if (!blocks.some((block) => block.height == data.block.height)) {
          setAllBlocks((prev) => prev.concat(data.block));
          // setBlocks(prevBlocks => [...prevBlocks, data.block])
        }
      }
    }
  }, [lastMessage]);

  // useEffect(() => console.log(allBlocks), [data]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const tableRowsData = ["Height", "Hash", "Validated by", "Tx num", "Time"];
  // @ts-ignore
  return (
    <TableContainer borderRadius="8px">
      <Table variant="simple">
        <Thead background="brand.accentLight">
          <Tr>
            {tableRowsData.map((item, idx) => (
              <Th
                key={idx}
                py="34px"
                fontSize="14px"
                fontWeight="bold"
                color="brand.primaryBlack"
              >
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody fontSize="16px" fontWeight="medium">
          {allBlocks
            .sort((a, b) => b.height - a.height)
            .map((block, idx) => (
              <Tr key={idx} bg="white">
                <Td py="20px">{block.height}</Td>
                <Td py="20px">{block.hash}</Td>
                <Td py="20px">Vasya</Td>
                <Td py="20px">{block.num_txs}</Td>
                {/*<Td>{new Date(block.timestamp).toLocaleTimeString("en-US")}</Td>*/}
                <Td>{formatTime(block.timestamp)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
// <Th
//     py="34px"
//     fontSize="14px"
//     fontWeight="bold"
//     color="brand.primaryBlack"
// >
//   Hash
// </Th>
// <Th
//     py="34px"
//     fontSize="14px"
//     fontWeight="bold"
//     color="brand.primaryBlack"
// >
//   Validated by
// </Th>
// <Th
//     py="34px"
//     fontSize="14px"
//     fontWeight="bold"
//     color="brand.primaryBlack"
// >
//   Tx num
// </Th>
// <Th
//     py="34px"
//     fontSize="14px"
//     fontWeight="bold"
//     color="brand.primaryBlack"
// >
//   Time
// </Th>
