// @ts-nocheck
import type { NextPage } from 'next';
import React, { useState, useEffect, useCallback } from 'react';

import styles from '../styles/Home.module.css';
import { Flex, Box, SimpleGrid, Center, Text, Square } from '@chakra-ui/react';
import { AreaSpline, Donut, Radialbar } from '../components/Charts';
import { TopCoinHoldersTable } from '../components/';

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
  console.log('props: ', props);
  return (
    <div>
      <main>
        <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
          Network statistics
        </Text>
        <Flex wrap="wrap" justifyContent="space-between">
          <Box w="50%" bg="white" borderRadius="10">
            <Text pl="30px" mt="30px" fontSize="18px" fontWeight="bold">
              Price Arch
            </Text>
            <Text pl="30px" fontSize="18px" fontWeight="medium" mt="6px" mb="18px">
              $ 30.064 (-4.007%)
            </Text>
            <AreaSpline />
          </Box>
          <Box w="49%">
            <SimpleGrid columns={2} spacingX="15px" spacingY="10px" fontSize="24px">
              <Box
                color="white"
                bg="#9127E3"
                bgGradient={
                  ' radial-gradient(\n' +
                  '      farthest-side at bottom left,\n' +
                  '      #1BE3DC, \n' +
                  '      transparent\n 95%' +
                  '    ),\n' +
                  '    radial-gradient(\n' +
                  '      farthest-corner at bottom right,\n' +
                  '      #E332BF, \n' +
                  '      transparent\n 90%' +
                  '    );'
                }
                boxShadow="sm"
                height="190px"
                borderRadius="10"
                pos="relative"
              >
                <Text fontSize="12px" padding="28px">
                  Block height
                </Text>
                <Center fontWeight="bold">
                  <Text color="white">{props.lastBlock?.height || '633198'}</Text>
                </Center>
              </Box>
              <Box
                bg="white"
                height="190px"
                boxShadow="sm"
                borderRadius="10"
                _hover={{
                  color: 'white',
                  bg: '#E332BF',
                  bgGradient:
                    ' radial-gradient(\n' +
                    '      farthest-side at bottom left,\n' +
                    '      #1BE3DC, \n' +
                    '      transparent\n 95%' +
                    '    ),\n' +
                    '    radial-gradient(\n' +
                    '      farthest-corner at bottom right,\n' +
                    '      #9127E3, \n' +
                    '      transparent\n 90%' +
                    '    );',
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
                  color: 'white',
                  bg: '#E332BF',
                  bgGradient:
                    ' radial-gradient(\n' +
                    '      farthest-side at bottom left,\n' +
                    '      #9127E3, \n' +
                    '      transparent\n 90%' +
                    '    ),\n' +
                    '    radial-gradient(\n' +
                    '      farthest-corner at bottom right,\n' +
                    '      #1BE3DC, \n' +
                    '      transparent\n 90%' +
                    '    );',
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
                  color: 'white',
                  bg: '#9127E3',
                  bgGradient:
                    ' radial-gradient(\n' +
                    '      farthest-side at top right,\n' +
                    '      #1BE3DC, \n' +
                    '      transparent\n 105%' +
                    '    ),\n' +
                    '    radial-gradient(\n' +
                    '      farthest-corner at bottom left,\n' +
                    '      #E332BF, \n' +
                    '      transparent\n 100%' +
                    '    );',
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
                        color: '#9C9B9E',
                        fontSize: '12px',
                        fontWeight: '300',
                      }}
                    >
                      &nbsp;Tp / s
                    </Text>
                  </Flex>
                </Center>
              </Box>
            </SimpleGrid>
          </Box>
          <Box
            display="inline-flex"
            justifyContent="space-between"
            bg="white"
            height="270px"
            w="50%"
            borderRadius="10"
            mt="10px"
            px="30px"
          >
            <Box py="20px" position="relative" width="60%">
              <Text fontSize="18px" fontWeight="bold">
                Tokenomics
              </Text>
              <Box mt="30px" display="flex" alignItems="center">
                <Square size="20px" bg="brand.accent" color="white" borderRadius="4px" />
                <Text pl="6px" fontSize="16px" fontWeight="medium">
                  Supply
                </Text>
                <Text pl="6px" marginLeft="68px" fontSize="16px" fontWeight="medium">
                  75%
                </Text>
              </Box>
              <Box mt="15px" display="inline-flex" alignItems="center">
                <Square size="20px" bg="brand.accentBlue" color="white" borderRadius="4px" />
                <Text pl="6px" fontSize="16px" fontWeight="medium">
                  Bonded
                </Text>
                <Text pl="6px" marginLeft="60px" fontSize="16px" fontWeight="medium">
                  25%
                </Text>
              </Box>

              <Text position="absolute" bottom="20px" fontSize="16px" fontWeight="medium">
                Total supply:
                <Text as="span" ml="10px" fontWeight="semibold">
                  10 220 637 486 23
                </Text>
              </Text>
            </Box>
            {/*<Donut />*/}
            <Box width="40%">
              <Radialbar />
            </Box>
          </Box>
          <Box bg="white" height="270px" w="49%" borderRadius="10" mt="10px">
            <Text p="20px" fontSize="18px" fontWeight="bold">
              Top 5 coin holders
            </Text>
            <TopCoinHoldersTable />
          </Box>
        </Flex>
      </main>
    </div>
  );
};

export default Home;

// bgGradient: "linear(to-tr, #1BE3DC,  #9127E3, #E332BF)",
