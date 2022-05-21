import Head from 'next/head';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, extendTheme, ScaleFade, Fade } from '@chakra-ui/react';
import apolloClient from '../utils/apolloClient';
import { LayoutWithSidebar } from '../components';
import '../styles/globals.css';
import '../components/Governance/ProposalsTable.css';

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
// fontFamily="Work Sans"
function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <title>Chainops Block Explorer</title>
          <meta name="description" content="Chainops Block Explorer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LayoutWithSidebar>
          <Fade key={router.route} in={true} unmountOnExit={true}>
            <Component {...pageProps} />
          </Fade>
        </LayoutWithSidebar>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
