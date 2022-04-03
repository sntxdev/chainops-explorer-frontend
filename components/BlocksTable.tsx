// @ts-nocheck
import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  Box,
  Flex,
  SimpleGrid,
  Grid,
  HStack,
  VStack,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

export const BlocksTable = () => {
  const [socketUrl, setSocketUrl] = useState(
    "ws://194.163.167.188:8000/archway"
  );
  // const [messageHistory, setMessageHistory] = useState([]);
  // const [txs, setTxs] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  // const [lastTxs, setLastTxs] = useState([]);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    socketUrl,
    {
      onOpen: () => sendMessage("{}"),
    }
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.hasOwnProperty("block")) {
        if (!blocks.some((block) => block.height == data.block.height)) {
          setBlocks((prev) => prev.concat(data.block));
        }
      }
    }
  }, [lastMessage]);

  // const handleClickSendMessage = useCallback(() => sendMessage("{}"), []);

  useEffect(() => console.log(blocks), [blocks]);

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
          {blocks
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
