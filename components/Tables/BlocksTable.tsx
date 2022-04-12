// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { IoCopyOutline } from 'react-icons/io5';

import { formatTime, truncate } from '../../utils';

export const BlocksTable = ({ data }: any) => {
  const [socketUrl, setSocketUrl] = useState(
    // "ws://194.163.167.188:8000/archway"
    'wss://explorer.chainops.org/ws/archway'
  );

  const [blocks, setBlocks] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {
    onOpen: () => sendMessage('{}'),
  });

  useEffect(() => {
    setAllBlocks(data);
  }, [data]);

  useEffect(() => {
    if (lastMessage !== null) {
      const wssData = JSON.parse(lastMessage.data);

      if (wssData.hasOwnProperty('block')) {
        if (!blocks.some((block) => block.height == wssData.block.height)) {
          setAllBlocks((prev) => prev.concat(wssData.block));
          // setBlocks(prevBlocks => [...prevBlocks, data.block])
        }
      }
    }
  }, [lastMessage]);

  useEffect(() => console.log(allBlocks));

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const tableRowsData = ['Height', 'Hash', 'Validated by', 'Tx num', 'Time'];
  // @ts-ignore
  return (
    <TableContainer borderRadius="8px">
      <Table variant="simple">
        <Thead background="brand.accentLight">
          <Tr>
            {tableRowsData.map((item, idx) => (
              <Th key={idx} py="34px" fontSize="14px" fontWeight="bold" color="brand.primaryBlack">
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody fontSize="16px" fontWeight="medium">
          {allBlocks
            .sort((a, b) => b.height - a.height)
            .map((block, idx) => (
              <Tr key={idx} bg="white">
                <Td py="20px">
                  <Link href={`/blocks/${block.height}`}>
                    <a style={{ color: '#1F1BE3' }}>{block.height}</a>
                  </Link>
                </Td>
                <Td py="20px" display="flex">
                  <Text as="span" mr="8px">
                    {truncate(block.hash, 5, 5, 13)}
                  </Text>
                  <Tooltip label="copy" placement="top-end" closeDelay={100}>
                    <IconButton
                      variant="link"
                      verticalAlign="text-top"
                      icon={<IoCopyOutline />}
                      _hover={{ cursor: 'pointer' }}
                      _focus={{ outline: 'none' }}
                    />
                  </Tooltip>
                </Td>
                <Td py="20px">Vasya</Td>
                <Td py="20px">{block.num_txs}</Td>
                {/*<Td>{new Date(block.timestamp).toLocaleTimeString("en-US")}</Td>*/}
                <Td>{formatTime(block.datetime)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
