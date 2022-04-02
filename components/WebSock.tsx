import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  Box,
  Flex,
  SimpleGrid,
  Grid,
  HStack,
  VStack,
  Center,
  Button,
} from "@chakra-ui/react";
export const WebSock = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    "ws://194.163.167.188:8000/archway"
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const [txs, setTxs] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const [lastTxs, setLastTxs] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);

      // @ts-ignore
      setMessageHistory((prev) => prev.concat(lastMessage));

      if (data.hasOwnProperty("block")) {
        setBlocks((prev) => prev.concat(data.block));
        setLastBlock(data.block);
      }

      if (data.hasOwnProperty("transaction")) {
        setTxs((prev) => prev.concat(data.transaction));
        if (data.transaction.height == lastBlock.height) {
          // setLastTxs(data.transaction);
          setLastTxs((prev) => prev.concat(data.transaction));
        }
      }
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage("{}"), []);
  // useEffect(() => console.log("Transactions: ", txs), [txs]);
  // useEffect(() => console.log(blocks), [blocks]);
  useEffect(() => console.log("Last Block:", lastBlock), [lastBlock]);
  useEffect(() => console.log("Last lastTxs:", lastTxs), [lastTxs]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  // @ts-ignore
  return (
    <div>
      <Button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Start websocket
      </Button>

      {lastBlock ? (
        <div>
          <p>Last block height: {lastBlock.height}</p>
          <p>Last block hash: {lastBlock.hash}</p>
          {lastTxs.map((tx) => tx.hash)}
        </div>
      ) : null}
    </div>
  );
};

// <span>The WebSocket is currently {connectionStatus}</span>
// {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}

// <ul>
//   {messageHistory.map((message, idx) => (
//       // @ts-ignore
//       <span key={idx}>{message ? message.data : null}</span>
//   ))}
// </ul>
