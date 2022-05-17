// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { SigningCosmosClient } from '@cosmjs/launchpad';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { assertIsDeliverTxSuccess, SigningStargateClient } from '@cosmjs/stargate';
import { calculateFee, GasPrice } from '@cosmjs/stargate';

import { Box, Button, Input, Text } from '@chakra-ui/react';

const Staking = () => {
  const [userAddress, setUserAddress] = useState();
  const AMOUNT = {
    value: '42000.00000000',
    currency: {
      code: 'RUR',
      minority: 5,
    },
  };

  const connectWallet = async () => {
    console.log('Connecting wallet...');
    try {
      if (window) {
        if (window['keplr']) {
          if (window.keplr['experimentalSuggestChain']) {
            await window.keplr.experimentalSuggestChain(ToriiInfo);
            await window.keplr.enable(ToriiInfo.chainId);
            let offlineSigner = await window.getOfflineSigner(ToriiInfo.chainId);

            const accounts = await offlineSigner.getAccounts();
            console.log(accounts);
            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            // const cosmJS = new SigningCosmosClient(
            //   ToriiInfo.rpc,
            //   accounts[0].address,
            //   offlineSigner
            // );

            setUserAddress(accounts[0].address);

            const client = await SigningStargateClient.connectWithSigner(
              'https://rpc.cosmos.network/',
              offlineSigner
            );
            const balance = await client.getBalance(accounts[0].address, 'uatom');
            console.log(balance);
            console.log('client:', client);
          } else {
            console.warn('Error access experimental features, please update Keplr');
          }
        } else {
          console.warn('Error accessing Keplr');
        }
      } else {
        console.warn('Error parsing window object');
      }
    } catch (e) {
      console.error('Error connecting to wallet', e);
    }
  };

  useEffect(() => {
    // @ts-ignore
    console.log('userAddress: ', userAddress);
  }, [userAddress]);
  return (
    <div>
      <Button mx="8px">Stake</Button>
      <Button mx="8px">Unstake</Button>
      <Button mx="8px">Claim Rewards</Button>
      <Button onClick={connectWallet}>Connect Wallet</Button>
      <p>Your address: {userAddress}</p>
      <Box my={4}>
        <Text>Send tokens</Text>
        <Input placeholder="to address" width="40%" />
        <Input placeholder="amount" htmlSize={5} width="auto" />
        <Text as="span">tori</Text>
      </Box>
    </div>
  );
};

export default Staking;

// https://blog.archway.io/how-to-build-your-first-archway-dapp-2c72a3993c9f
export const ToriiInfo = {
  chainId: 'torii-1',
  chainName: 'Torii Testnet',
  rpc: 'https://rpc.torii-1.archway.tech',
  rest: 'https://api.torii-1.archway.tech',
  stakeCurrency: { coinDenom: 'TORII', coinMinimalDenom: 'utorii', coinDecimals: 6 },
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: 'archway',
    bech32PrefixAccPub: 'archwaypub',
    bech32PrefixValAddr: 'archwayvaloper',
    bech32PrefixValPub: 'archwayvaloperpub',
    bech32PrefixConsAddr: 'archwayvalcons',
    bech32PrefixConsPub: 'archwayvalconspub',
  },
  currencies: [{ coinDenom: 'TORII', coinMinimalDenom: 'utorii', coinDecimals: 6 }],
  feeCurrencies: [{ coinDenom: 'TORII', coinMinimalDenom: 'utorii', coinDecimals: 6 }],
  coinType: 118,
  gasPriceStep: { low: 0, average: 0.1, high: 0.2 },
  features: ['cosmwasm'],
};
