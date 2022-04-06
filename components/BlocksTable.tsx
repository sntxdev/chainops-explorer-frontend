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
} from "@chakra-ui/react";

export const BlocksTable = ({ data }: any) => {
  const [socketUrl, setSocketUrl] = useState(
    "ws://194.163.167.188:8000/archway"
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

  // const handleClickSendMessage = useCallback(() => sendMessage("{}"), []);

  // useEffect(() => console.log(blocks), [blocks]);
  // useEffect(() => console.log(allBlocks), [data]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  // @ts-ignore
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Height</Th>
            <Th>Hash</Th>
            <Th>Timestamp</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allBlocks
            .sort((a, b) => b.height - a.height)
            .map((block, idx) => (
              <Tr key={idx}>
                <Td>{block.height}</Td>
                <Td>{block.hash}</Td>
                <Td>{block.timestamp}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
