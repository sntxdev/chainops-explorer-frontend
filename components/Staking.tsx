// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { SigningCosmosClient } from '@cosmjs/launchpad';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { assertIsDeliverTxSuccess, SigningStargateClient } from '@cosmjs/stargate';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { Button } from '@chakra-ui/react';

const Staking = () => {
  const [userAddress, setUserAddress] = useState();

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

            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            const cosmJS = new SigningCosmosClient(
              ToriiInfo.rpc,
              accounts[0].address,
              offlineSigner
            );
            setUserAddress(accounts[0].address);
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
    console.log(userAddress);
  }, [userAddress]);
  return (
    <div>
      <Button>Stake</Button>
      <Button>Unstake</Button>
      <Button>Claim Rewards</Button>
      <Button onClick={connectWallet}>Connect Wallet</Button>
      <p>Your address: {userAddress}</p>
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
