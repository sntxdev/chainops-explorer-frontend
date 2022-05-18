// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { SigningCosmosClient } from '@cosmjs/launchpad';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  coins,
  parseCoins,
} from '@cosmjs/stargate';
import { calculateFee, GasPrice } from '@cosmjs/stargate';

import {
  useToast,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

const Staking = () => {
  const toast = useToast();

  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState(null);
  const [recipientAmount, setRecipientAmount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [stargateClient, setStargateClient] = useState(null);

  const connectWallet = async () => {
    console.log('Connecting wallet...');
    try {
      if (window) {
        if (window['keplr']) {
          if (window.keplr['experimentalSuggestChain']) {
            await window.keplr.experimentalSuggestChain(ThetaTestnetInfo);
            await window.keplr.enable(ThetaTestnetInfo.chainId);
            let offlineSigner = await window.getOfflineSigner(ThetaTestnetInfo.chainId);
            setSigner(offlineSigner);
            const accounts = await offlineSigner.getAccounts();
            console.log(accounts);
            console.log(offlineSigner);
            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            // const cosmJS = new SigningCosmosClient(
            //   ToriiInfo.rpc,
            //   accounts[0].address,
            //   offlineSigner
            // );

            setUserAddress(accounts[0].address);

            const client = await SigningStargateClient.connectWithSigner(
              'https://cosmos-testnet-rpc.allthatnode.com:26657',
              offlineSigner
            );
            setStargateClient(client);
            console.log('client:', client);

            const balance = await client.getBalance(accounts[0].address, 'uatom');
            setUserBalance(balance);
            console.log('balance:', balance);
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

  const sendTokens = async (recipient: any, amount: any) => {
    let amount = parseFloat(amount);
    amount *= 1000000;
    amount = Math.floor(amount);

    const sendMsg = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: userAddress,
        toAddress: recipient,
        amount: parseCoins(`${amount}uatom`),
      },
    };

    const fee = {
      gas: '80000',
      amount: [
        {
          amount: '5000',
          denom: 'uatom',
        },
      ],
    };

    return await stargateClient.signAndBroadcast(userAddress, [sendMsg], fee as any, 'MEMO tuta');
  };

  const handleSendClick = async () => {
    const result = await sendTokens(recipientAddress, recipientAmount);
    if (result.transactionHash) {
      const balance = await stargateClient.getBalance(userAddress, 'uatom');
      setUserBalance(balance);
      toast({
        title: 'Tokens sent successfully',
        description: `Success: https://explorer.theta-testnet.polypore.xyz/transactions/${result.transactionHash}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    console.log(result);
  };
  const handleRecipientAddressChange = (event) => setRecipientAddress(event.target.value);
  const handleRecipientAmountChange = (event) => setRecipientAmount(event.target.value);

  useEffect(() => {
    // @ts-ignore
    console.log('userAddress: ', userAddress);
  }, [userAddress]);

  return (
    <div>
      <Button mr="8px">Stake</Button>
      <Button mx="8px">Unstake</Button>
      <Button mx="8px">Claim Rewards</Button>
      <Button onClick={connectWallet}>Connect Wallet</Button>
      <Box my="12px">
        <p>Your address: {userAddress || 'wallet is not connected'}</p>
        <p>
          Your balance: {userBalance?.amount / 1000000 || '0'} {userBalance?.denom}
        </p>
      </Box>
      <Box my={4}>
        <Text>Send tokens</Text>
        <Input
          placeholder="to address"
          width="30%"
          onChange={handleRecipientAddressChange}
          mr="6px"
        />
        <Box pos="relative" display="inline-flex" alignItems="center">
          <Input
            placeholder="amount"
            width="180px"
            onChange={handleRecipientAmountChange}
            mx="6px"
          />
          <Text as="span" pos="absolute" right="16px" fontSize="14px">
            ATOM
          </Text>
        </Box>
        <Button width="120px" onClick={handleSendClick}>
          Send
        </Button>
      </Box>

      <Box>
        <p> Recipient address example:</p>
        <a href="https://explorer.theta-testnet.polypore.xyz/account/cosmos1glnl9nkcu9n3ptcg2f05huya6vq8gfvr8u0xfx">
          https://explorer.theta-testnet.polypore.xyz/account/cosmos1glnl9nkcu9n3ptcg2f05huya6vq8gfvr8u0xfx
        </a>
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

export const ThetaTestnetInfo = {
  chainId: 'theta-testnet-001',
  chainName: 'theta-testnet-001',
  rpc: 'https://rpc.sentry-01.theta-testnet.polypore.xyz/',
  rest: 'https://rest.sentry-01.theta-testnet.polypore.xyz/',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'cosmos',
    bech32PrefixAccPub: 'cosmos' + 'pub',
    bech32PrefixValAddr: 'cosmos' + 'valoper',
    bech32PrefixValPub: 'cosmos' + 'valoperpub',
    bech32PrefixConsAddr: 'cosmos' + 'valcons',
    bech32PrefixConsPub: 'cosmos' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'ATOM',
      coinMinimalDenom: 'uatom',
      coinDecimals: 6,
      coinGeckoId: 'cosmos',
    },
    {
      coinDenom: 'THETA',
      coinMinimalDenom: 'theta',
      coinDecimals: 0,
    },
    {
      coinDenom: 'LAMBDA',
      coinMinimalDenom: 'lambda',
      coinDecimals: 0,
    },
    {
      coinDenom: 'RHO',
      coinMinimalDenom: 'rho',
      coinDecimals: 0,
    },
    {
      coinDenom: 'EPSILON',
      coinMinimalDenom: 'epsilon',
      coinDecimals: 0,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'ATOM',
      coinMinimalDenom: 'uatom',
      coinDecimals: 6,
      coinGeckoId: 'cosmos',
    },
  ],
  stakeCurrency: {
    coinDenom: 'ATOM',
    coinMinimalDenom: 'uatom',
    coinDecimals: 6,
    coinGeckoId: 'cosmos',
  },
  coinType: 118,
  gasPriceStep: {
    low: 0.1,
    average: 0.5,
    high: 1,
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
};
