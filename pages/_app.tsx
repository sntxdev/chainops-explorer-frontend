import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState, useEffect, useCallback } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import useWebSocket from 'react-use-websocket';
import { ChakraProvider, extendTheme, ScaleFade, Fade } from '@chakra-ui/react';
import { LayoutWithSidebar } from '../components';
import '../styles/globals.css';

const theme = extendTheme({
  colors: {
    primary: {
      main: '#323B5A',
    },
    brand: {
      primaryBlack: '#323B5A',
      accent: '#9127E3',
      accentLight: '#ECE0F5',
      accentBlue: '#1BE3DC',
      greyPrimary: '#38383d',
      greySecondary: '#42414d',
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
});

// Roboto Mono
// Montserrat

const client = new ApolloClient({
  uri: 'https://explorer.chainops.org/api/v1/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const [lastBlock, setLastBlock] = useState(null);
  const [trxCounter, setTrxCounter] = useState(0);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    'wss://explorer.chainops.org/ws/archway',
    {
      // onOpen: () => sendMessage("{}"),
    }
  );

  // useEffect(() => {
  //   setAllBlocks(data);
  // }, [data]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.hasOwnProperty('block')) {
        setLastBlock(data.block);
        setTrxCounter((prev) => prev + data.block.num_txs);
        // if (!blocks.some((block) => block.height == data.block.height)) {
        // setAllBlocks((prev) => prev.concat(data.block));
        // setBlocks(prevBlocks => [...prevBlocks, data.block])
        // }
      }
    }
  }, [lastMessage]);

  // useEffect(() => console.log('lastblock: ', lastBlock), [lastMessage]);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Oswald:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <title>Chainops Block Explorer</title>
          <meta name="description" content="Chainops Block Explorer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LayoutWithSidebar>
          <Fade key={router.route} in={true} unmountOnExit={true}>
            <Component {...pageProps} lastBlock={lastBlock} trxCounter={trxCounter} />
          </Fade>
        </LayoutWithSidebar>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
