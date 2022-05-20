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
import { coin } from '@cosmjs/proto-signing';
import { MsgDelegate } from '@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx';

import { calculateFee, GasPrice } from '@cosmjs/stargate';

import {
  useToast,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Spinner,
} from '@chakra-ui/react';

export interface MsgDelegate {
  delegatorAddress: string;
  validatorAddress: string;
  amount?: any;
}

const Staking = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState(null);
  const [recipientAmount, setRecipientAmount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [stargateClient, setStargateClient] = useState(null);

  const connectWallet = async () => {
    try {
      if (window) {
        if (window['keplr']) {
          if (window.keplr['experimentalSuggestChain']) {
            await window.keplr.experimentalSuggestChain(ToriiInfo);
            await window.keplr.enable(ToriiInfo.chainId);
            const offlineSigner = await window.getOfflineSigner(ToriiInfo.chainId);
            const client = await SigningStargateClient.connectWithSigner(
              'https://chainops.store:26657/',
              offlineSigner
            );

            const accounts = await offlineSigner.getAccounts();
            const balance = await client.getBalance(accounts[0].address, 'utorii');

            setSigner(offlineSigner);
            setUserAddress(accounts[0].address);
            setStargateClient(client);
            setUserBalance(balance);
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
        amount: parseCoins(`${amount}utorii`),
      },
    };

    const fee = {
      gas: '800000',
      amount: [
        {
          amount: '5000',
          denom: 'utorii',
        },
      ],
    };

    return await stargateClient.signAndBroadcast(userAddress, [sendMsg], fee as any);
  };

  const delegateTokens = async (recipient: any, amount: any) => {
    await window.keplr.enable(ToriiInfo.chainId);
    let amount = parseFloat(amount);
    amount *= 1000000;
    amount = Math.floor(amount);

    const sendMsg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: {
        delegatorAddress: userAddress,
        validatorAddress: recipient,
        amount: coin(amount, 'utorii'),
      },
    };
    // const fee = {
    //   gas: '85000',
    //   amount: [
    //     {
    //       amount: '5000',
    //       denom: 'utorii',
    //     },
    //   ],
    // };
    const gasPrice = GasPrice.fromString('0.025utorii');
    const gasLimitSend = process.env.FAUCET_GAS_LIMIT
      ? parseInt(process.env.FAUCET_GAS_LIMIT, 10)
      : 200_000;
    const fee = calculateFee(gasLimitSend, gasPrice);

    return await stargateClient.signAndBroadcast(
      userAddress,
      [sendMsg],
      fee as any,
      'MEMO delegate'
    );
  };

  const undelegateTokens = async (recipient: any, amount: any) => {
    await window.keplr.enable(ToriiInfo.chainId);
    let amount = parseFloat(amount);
    amount *= 1000000;
    amount = Math.floor(amount);

    const gasPrice = GasPrice.fromString('0.025utorii');
    const gasLimitSend = process.env.FAUCET_GAS_LIMIT
      ? parseInt(process.env.FAUCET_GAS_LIMIT, 10)
      : 200_000;
    const fee = calculateFee(gasLimitSend, gasPrice);

    const sendMsg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: {
        delegatorAddress: userAddress,
        validatorAddress: recipient,
        amount: coin(amount, 'utorii'),
      },
    };

    return await stargateClient.signAndBroadcast(
      userAddress,
      [sendMsg],
      fee as any,
      'MEMO undelegate'
    );
  };

  const handleSendClick = async () => {
    const result = await sendTokens(recipientAddress, recipientAmount);

    if (result.code !== undefined && result.code !== 0) {
      alert('Failed to send tx: ' + result.log || result.rawLog);
    } else {
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

  const handleDelegateClick = async () => {
    setLoading(true);
    const result = await delegateTokens(recipientAddress, recipientAmount);
    setLoading(false);
    if (result.code !== undefined && result.code !== 0) {
      alert('Failed to send tx: ' + result.log || result.rawLog);
    } else {
      const balance = await stargateClient.getBalance(userAddress, 'uatom');
      setUserBalance(balance);
      alert('Succeed to send tx:' + result.transactionHash);
    }

    console.log(result);
  };

  const handleUndelegateClick = async () => {
    const result = await undelegateTokens(recipientAddress, recipientAmount);

    if (result.code !== undefined && result.code !== 0) {
      alert('Failed to send tx: ' + result.log || result.rawLog);
    } else {
      const balance = await stargateClient.getBalance(userAddress, 'uatom');
      setUserBalance(balance);
      alert('Succeed to send tx:' + result.transactionHash);
    }

    console.log(result);
  };

  const handleRecipientAddressChange = (event) => setRecipientAddress(event.target.value);
  const handleRecipientAmountChange = (event) => setRecipientAmount(event.target.value);

  useEffect(() => {
    console.log('userAddress: ', userAddress);
  }, [userAddress]);

  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet</Button>
      <Box my="12px">
        <p>Your address: {userAddress || 'wallet is not connected'}</p>
        <p>Your balance: {userBalance?.amount / 1000000 || '0'} TORII</p>
      </Box>

      {loading && (
        <>
          Sending transacton...
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </>
      )}

      {/* Delegate tokens */}
      <Box>
        <Text>Delegate tokens</Text>
        <Input
          placeholder="to valoper address"
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
            TORII
          </Text>
        </Box>
        <Button width="120px" onClick={handleDelegateClick}>
          Delegate
        </Button>
      </Box>

      <Button>Claim Rewards</Button>
      <Button mx="8px" onClick={handleUndelegateClick}>
        Unstake
      </Button>
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
  gasPriceStep: { low: 0, average: 1, high: 2 },
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
