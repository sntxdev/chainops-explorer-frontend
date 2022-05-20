// @ts-nocheck
import type { NextPage } from 'next';
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import ClientOnly from '../components/ClientOnly';
import { Flex, Box, SimpleGrid, Center, Text, Square } from '@chakra-ui/react';
import { AreaSpline, Donut, Radialbar } from '../components/Charts';
import { TopCoinHoldersTable } from '../components/';
import {
  BlockHeightCountSubscription,
  BlocksQuery,
  TxCountSubscription,
  TxPerMinuteSubscription,
  ActiveValidatorsQuery,
} from '../graphql';

const Home: NextPage = (props) => {
  const [activeBox, setActiveBox] = useState<any>(0);
  const handleHover = (id: String) => {
    setActiveBox(id);
  };

  return (
    <div>
      <main>
        <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
          Network statistics
        </Text>
        <Flex wrap="wrap" justifyContent="space-between">
          <Box w="50%" bg="white" borderRadius="10" boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)">
            <Text pl="30px" mt="30px" fontSize="18px" fontWeight="bold">
              Price Arch
            </Text>
            <Text pl="30px" fontSize="18px" fontWeight="medium" mt="6px" mb="18px">
              $ 30.064 (-4.007%)
            </Text>
            <AreaSpline />
          </Box>

          {/*DataBoxes*/}
          <Box w="49%" onMouseLeave={() => setActiveBox(0)}>
            <SimpleGrid columns={2} spacingX="15px" spacingY="10px" fontSize="24px">
              <DataBoxBlockHeight onHover={handleHover} activeBox={activeBox} />
              <DataBoxTrxCount onHover={handleHover} activeBox={activeBox} />
              <DataBoxActiveValidators onHover={handleHover} activeBox={activeBox} />
              <DataBoxTrxPs onHover={handleHover} activeBox={activeBox} />
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
            boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
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
          <Box
            bg="white"
            height="270px"
            w="49%"
            borderRadius="10"
            mt="10px"
            boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
          >
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

const DataBoxBlockHeight = ({ onHover, activeBox }: any) => {
  const { data, loading, error } = useSubscription(BlockHeightCountSubscription);
  useEffect(() => console.log('blockHeight:', lastBlockHeight), [data]);
  const lastBlockHeight = data?.archway_block[0].height;

  return (
    <ClientOnly>
      <Box
        onMouseEnter={() => onHover(0)}
        color={activeBox == 0 ? 'white' : 'brand.primaryBlack'}
        bg={activeBox == 0 ? '#9127E3' : 'white'}
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        _hover={{
          color: 'white',
          bg: '#9127E3',
          bgGradient:
            ' radial-gradient(\n' +
            '      farthest-side at bottom left,\n' +
            '      #1BE3DC, \n' +
            '      transparent\n 95%' +
            '    ),\n' +
            ' radial-gradient(\n' +
            '   farthest-corner at bottom right,\n' +
            '   #E332BF, \n' +
            '   transparent\n 90%' +
            ' );',
        }}
        bgGradient={
          activeBox == 0
            ? ' radial-gradient(\n' +
              '      farthest-side at bottom left,\n' +
              '      #1BE3DC, \n' +
              '      transparent\n 95%' +
              '    ),\n' +
              ' radial-gradient(\n' +
              '   farthest-corner at bottom right,\n' +
              '   #E332BF, \n' +
              '   transparent\n 90%' +
              ' );'
            : 'none'
        }
        height="192px"
        borderRadius="10"
        pos="relative"
      >
        <Text fontSize="12px" padding="28px">
          Block height
        </Text>
        <Center fontWeight="bold">
          <Text>{lastBlockHeight}</Text>
        </Center>
      </Box>
    </ClientOnly>
  );
};

const DataBoxTrxCount = ({ onHover, activeBox }: any) => {
  const { data, loading, error } = useSubscription(TxCountSubscription);
  const trxCounter = data?.tx?.aggregate?.count;
  useEffect(() => console.log('TrxCount:', trxCounter), []);

  const [tx, setTx] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setTx(trxCounter), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ClientOnly>
      <Box
        onMouseEnter={() => onHover(1)}
        height="190px"
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        borderRadius="10"
        color={activeBox == 1 ? 'white' : 'brand.primaryBlack'}
        bg={activeBox == 1 ? '#E332BF' : 'white'}
        bgGradient={
          activeBox == 1
            ? ' radial-gradient(\n' +
              '      farthest-side at bottom left,\n' +
              '      #1BE3DC, \n' +
              '      transparent\n 95%' +
              '    ),\n' +
              '    radial-gradient(\n' +
              '      farthest-corner at bottom right,\n' +
              '      #9127E3, \n' +
              '      transparent\n 90%' +
              '    );'
            : 'none'
        }
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
        <Center fontWeight="bold">{trxCounter}</Center>
      </Box>
    </ClientOnly>
  );
};

const DataBoxActiveValidators = ({ onHover, activeBox }: any) => {
  const { data, loading, error } = useQuery(ActiveValidatorsQuery);

  // const trxCounter = data?.archway_block[0].height;
  const active = data?.active?.aggregate?.count;
  const inactive = data?.inactive?.aggregate?.count;

  useEffect(() => console.log('active:', active), [data]);
  return (
    <ClientOnly>
      <Box
        onMouseEnter={() => onHover(2)}
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        height="180px"
        borderRadius="10"
        color={activeBox == 2 ? 'white' : 'brand.primaryBlack'}
        bg={activeBox == 2 ? '#E332BF' : 'white'}
        bgGradient={
          activeBox == 2
            ? ' radial-gradient(\n' +
              '      farthest-side at bottom left,\n' +
              '      #9127E3, \n' +
              '      transparent\n 90%' +
              '    ),\n' +
              '    radial-gradient(\n' +
              '      farthest-corner at bottom right,\n' +
              '      #1BE3DC, \n' +
              '      transparent\n 90%' +
              '    );'
            : 'none'
        }
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
        <Center fontWeight="bold">
          {active} / {inactive + active}
        </Center>
      </Box>
    </ClientOnly>
  );
};

const DataBoxTrxPs = ({ onHover, activeBox }: any) => {
  const { data, loading, error } = useSubscription(TxPerMinuteSubscription);
  console.log('data:', data);
  console.log('error:', error);
  console.log('loading:', loading);

  const trxPerMinute = data?.txPerMin[0].average_time;
  // useEffect(() => console  .log('data:', data), [data]);
  return (
    <ClientOnly>
      <Box
        onMouseEnter={() => onHover(3)}
        boxShadow="0 0.5rem 1rem rgb(0 0 0 / 5%)"
        height="180px"
        borderRadius="10"
        color={activeBox == 3 ? 'white' : 'brand.primaryBlack'}
        bg={activeBox == 3 ? '#9127E3' : 'white'}
        bgGradient={
          activeBox == 3
            ? ' radial-gradient(\n' +
              '      farthest-side at top right,\n' +
              '      #1BE3DC, \n' +
              '      transparent\n 105%' +
              '    ),\n' +
              '    radial-gradient(\n' +
              '      farthest-corner at bottom left,\n' +
              '      #E332BF, \n' +
              '      transparent\n 100%' +
              '    );'
            : 'none'
        }
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
          Transactions per minute
        </Text>
        <Center fontWeight="bold">
          <Flex flexDir="row" alignItems="baseline">
            <Text>{parseInt(trxPerMinute)}</Text>
            <Text
              style={{
                color: '#9C9B9E',
                fontSize: '12px',
                fontWeight: '300',
              }}
            >
              &nbsp;Tx / min
            </Text>
          </Flex>
        </Center>
      </Box>
    </ClientOnly>
  );
};
