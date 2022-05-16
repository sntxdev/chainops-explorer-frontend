import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { BlockByHeightQuery, ValidatorByAddressQuery, TxByHashQuery } from '../../graphql';
import { isSHA256, isBech32 } from '../../utils';
import { Box, Input } from '@chakra-ui/react';
import styles from './Search.module.css';

const isNumeric = (value: string) => /^-?\d+$/.test(value);

export function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState<any>([]);
  const [validatorAddress, setValidatorAddress] = useState('');
  const [blockHeight, setBlockHeight] = useState('');
  const [txHash, setTxHash] = useState('');

  const { data: block } = useQuery(BlockByHeightQuery, {
    variables: {
      height: blockHeight,
    },
  });

  const { data: transaction } = useQuery(TxByHashQuery, {
    variables: {
      hash: txHash,
    },
  });

  const { data: validator } = useQuery(ValidatorByAddressQuery, {
    variables: {
      address: validatorAddress,
    },
  });

  useEffect(() => {
    setResults(block?.archway_block);
  }, [block]);

  useEffect(() => {
    setResults(validator?.archway_validator_info);
  }, [validator]);

  useEffect(() => {
    setResults(transaction?.archway_transaction);
  }, [transaction]);

  useEffect(() => console.log('results', results), [results]);

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.length) {
      if (isNumeric(query)) setBlockHeight(query.toString());
      if (isSHA256(query)) setTxHash(query.toString());
      if (isBech32(query)) setValidatorAddress(query);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener('click', onClick);
    console.log('onFocus');
  }, []);

  const onClick = useCallback((event) => {
    // @ts-ignore
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);

      setBlockHeight('');
      setTxHash('');
      setValidatorAddress('');

      window.removeEventListener('click', onClick);
      console.log('onClickOutside');
    }
  }, []);

  return (
    <Box w="100%" position="relative">
      <Input
        onChange={onChange}
        onFocus={onFocus}
        value={query}
        ref={searchRef}
        type="text"
        height="56px"
        borderRadius="md"
        boxShadow="sm"
        bg="fff"
        border="0"
        focusBorderColor="none"
        placeholder="Search transaction, address or go to block #"
        _placeholder={{ color: '#D3D3D3' }}
        w="100%"
      />
      {active && results?.length > 0 && (
        <ul className={styles.results}>
          {results.map((item: any, idx: any) => {
            const searchParam = '';
            const { hash, height, operator_address } = item;
            return (
              <li className={styles.result} key={idx}>
                {hash && (
                  <Link href="/transactions/[id]" as={`/transactions/${hash}`}>
                    <a>Transaction: {hash}</a>
                  </Link>
                )}
                {height && (
                  <Link href="/blocks/[id]" as={`/blocks/${height}`}>
                    <a>Block: #{height}</a>
                  </Link>
                )}
                {operator_address && (
                  <Link href="/validators/[id]" as={`/validators/${operator_address}`}>
                    <a>Validator: {operator_address}</a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
