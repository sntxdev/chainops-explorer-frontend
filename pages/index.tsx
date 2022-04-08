// @ts-nocheck
import type { NextPage } from "next";
import React, { useState, useEffect, useCallback } from "react";

import styles from "../styles/Home.module.css";
import { Flex, Box, SimpleGrid, Center, Text } from "@chakra-ui/react";
import { AreaSpline, Donut } from "../components/Charts";

const Home: NextPage = (props) => {
  //
  // const [socketUrl, setSocketUrl] = useState(
  //   "ws://194.163.167.188:8000/archway"
  // );
  // const [messageHistory, setMessageHistory] = useState([]);
  // const [txs, setTxs] = useState([]);
  // const [blocks, setBlocks] = useState([]);
  // const [lastBlock, setLastBlock] = useState(null);
  // const [lastTxs, setLastTxs] = useState([]);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  //
  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     const data = JSON.parse(lastMessage.data);
  //
  //     // @ts-ignore
  //     setMessageHistory((prev) => prev.concat(lastMessage));
  //
  //     if (data.hasOwnProperty("block")) {
  //       setBlocks((prev) => prev.concat(data.block));
  //       setLastBlock(data.block);
  //     }
  //
  //     if (data.hasOwnProperty("transaction")) {
  //       setTxs((prev) => prev.concat(data.transaction));
  //       if (data.transaction.height == lastBlock.height) {
  //         // setLastTxs(data.transaction);
  //         setLastTxs((prev) => prev.concat(data.transaction));
  //       }
  //     }
  //   }
  // }, [lastMessage, setMessageHistory]);
  //
  // const handleClickSendMessage = useCallback(() => sendMessage("{}"), []);
  // useEffect(() => console.log("Transactions: ", txs), [txs]);
  // useEffect(() => console.log(blocks), [blocks]);
  // useEffect(() => console.log("Last Block:", lastBlock), [lastBlock]);
  // useEffect(() => console.log("Last lastTxs:", lastTxs), [lastTxs]);

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];
  console.log("props: ", props);
  return (
    <div>
      <main>
        <Flex wrap="wrap" justifyContent="space-between">
          <Box w="49%" height="378px" bg="white">
            <AreaSpline />
          </Box>
          <Box height="390px" w="49%">
            <SimpleGrid
              columns={2}
              spacingX="15px"
              spacingY="20px"
              fontSize="24px"
            >
              <Box
                color="white"
                bgGradient="linear(to-tr, #1BE3DC,  #9127E3, #E332BF)"
                boxShadow="sm"
                height="180px"
                borderRadius="10"
                pos="relative"
              >
                <Text fontSize="12px" padding="28px">
                  Block height
                </Text>
                <Center fontWeight="bold">
                  <Text color="white">
                    {props.lastBlock?.height || "633198"}
                  </Text>
                </Center>
              </Box>
              <Box
                bg="white"
                height="180px"
                boxShadow="sm"
                borderRadius="10"
                _hover={{
                  color: "white",
                  bgGradient: "linear(to-tr, #1BE3DC,  #9127E3, #E332BF)",
                }}
              >
                <Text fontSize="12px" padding="28px">
                  Trx count
                </Text>
                <Center fontWeight="bold">{props?.trxCounter}</Center>
              </Box>
              <Box
                bg="white"
                boxShadow="sm"
                height="180px"
                borderRadius="10"
                _hover={{
                  color: "white",
                  bgGradient: "linear(to-tr, #1BE3DC,  #9127E3, #E332BF)",
                }}
              >
                <Text fontSize="12px" padding="28px">
                  Active validators
                </Text>
                <Center fontWeight="bold">112 / 155</Center>
              </Box>
              <Box
                bg="white"
                boxShadow="sm"
                height="180px"
                borderRadius="10"
                _hover={{
                  color: "white",
                  bgGradient: "linear(to-tr, #1BE3DC,  #9127E3, #E332BF)",
                }}
              >
                <Text fontSize="12px" padding="28px">
                  Transactions per second
                </Text>
                <Center fontWeight="bold">
                  <Flex flexDir="row" alignItems="baseline">
                    <Text>1 248 </Text>
                    <Text
                      style={{
                        color: "#9C9B9E",
                        fontSize: "12px",
                        fontWeight: "300",
                      }}
                    >
                      &nbsp;Tp / s
                    </Text>
                  </Flex>
                </Center>
              </Box>
            </SimpleGrid>
          </Box>
          <Box bg="white" height="40vh" w="49%">
            <Donut />
          </Box>
          <Box bg="white" height="40vh" w="49%">
            3
          </Box>
        </Flex>
      </main>
    </div>
  );
};

export default Home;
