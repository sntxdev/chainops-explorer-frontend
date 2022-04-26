import {
  Box,
  Divider,
  Avatar,
  Text,
  Progress,
  Grid,
  GridItem,
  Link,
  VStack,
  HStack,
  Flex,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { BlocksQuery, TxCountSubscription, ValidatorDetailsQuery } from '../../graphql';
import React, { useState, useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/all';
import { DelegatorsTable } from './DelegatorsTable';

export const ValidatorDetails = ({ valoperAddress }: any) => {
  const { data, loading, error } = useQuery(ValidatorDetailsQuery, {
    variables: {
      operator_address: valoperAddress,
    },
  });

  useEffect(() => console.log('data val det', data), [data]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>error :(</div>;
  }

  const description = data?.archway_validator[0]?.validator_description;
  const info = data?.archway_validator[0]?.validator_info;

  return (
    <Box>
      {/*Main info*/}
      <Box bg="white" borderRadius="10px" p="18px">
        <Box display="flex" alignItems="center">
          {description?.avatar_url ? (
            <Avatar src={description?.avatar_url} mr="16px" size="lg" />
          ) : (
            <Avatar bg="red.100" icon={<AiOutlineUser fontSize="1rem" />} />
          )}

          <Box ml="16px">
            <Text fontSize="22px" fontWeight="semibold">
              {description?.moniker}
            </Text>
            <Text mt="2px">{description?.details}</Text>
          </Box>
        </Box>
        <Divider my="32px" />
        <Box>
          <Text as="span" mr="100px" fontWeight="semibold">
            Website
          </Text>
          <Link href={description?.website} isExternal>
            {description?.website}
          </Link>
        </Box>
      </Box>

      {/*Addresses*/}
      <Box bg="white" borderRadius="10px" my="16px" p="18px" overflow="hidden">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem w="100%">
            <Text fontWeight="semibold">Operator address</Text>
            <Text>{info.operator_address}</Text>
          </GridItem>
          <GridItem w="100%">
            <Text fontWeight="semibold">Self Delegate Address</Text>
            <Text>{info.account?.address}</Text>
          </GridItem>
        </Grid>

        <Divider my="32px" />
        <Grid templateColumns="repeat(4, 1fr)">
          <GridItem w="100%">
            <Text fontWeight="semibold">Status</Text>
            <Text>Active</Text>
          </GridItem>
          <GridItem w="100%">
            <Text fontWeight="semibold">Comission</Text>
            <Text>9.99%</Text>
          </GridItem>
          <GridItem w="100%">
            <Text fontWeight="semibold">Condition</Text>
            <Text>Good</Text>
          </GridItem>
          <GridItem w="100%">
            <Text fontWeight="semibold">Max Commission Rate</Text>
            <Text>39.99%</Text>
          </GridItem>
        </Grid>
      </Box>

      {/* Voting Power / Bonded */}
      <HStack align="start">
        {/*Voting Power*/}
        <Box flex="0 0 55%" bg="white" borderRadius="10px" p="18px">
          <Text my="16px" fontSize="22px" fontWeight="semibold">
            Voting Power
          </Text>
          <Box my="16px">
            <Text as="span" mr="18px">
              14.48%
            </Text>
            <Text as="span">3,491,560 / 77,955,680</Text>
          </Box>
          <Progress value={14.48} my="16px" />
          <Box display="flex" justifyContent="space-between" my="12px">
            <Text fontWeight="semibold">Block</Text>
            <Link>5,148,118</Link>
          </Box>
          <Box display="flex" justifyContent="space-between" my="12px">
            <Text fontWeight="semibold">Voting Power</Text>
            <Link>3,491,560</Link>
          </Box>
          <Box display="flex" justifyContent="space-between" my="12px">
            <Text fontWeight="semibold">Voting Power %</Text>
            <Link>4.48%</Link>
          </Box>
        </Box>

        {/*Bonded*/}
        <VStack flex="0 0 45%" bg="white" borderRadius="10px" my="16px" p="18px">
          <Text my="16px" fontSize="22px" fontWeight="semibold">
            Bonded
          </Text>
          <VStack alignSelf="stretch">
            <Flex justifyContent="space-between" width="100%">
              <Text fontWeight="semibold">Self Bonded</Text>
              <VStack alignItems="flex-end">
                <Text>99.96%</Text>
                <Text>(714 936.68 TORII)</Text>
              </VStack>
            </Flex>
            <Flex justifyContent="space-between" width="100%" my="12px">
              <Text fontWeight="semibold">Delegators</Text>
              <Text>11</Text>
            </Flex>
            <Flex justifyContent="space-between" width="100%" my="12px">
              <Text fontWeight="semibold">Bonded Height</Text>
              <Text>1</Text>
            </Flex>
          </VStack>
        </VStack>
      </HStack>

      {/*Delegators Table*/}
      <Box mt="16px" p="8px" bg="white">
        <ButtonGroup spacing="2" mb="12px">
          <Button bg="#f8f8f8" fontWeight="600">
            Delegations (85)
          </Button>
          <Button bg="#f8f8f8" fontWeight="300">
            Redelegations (2)
          </Button>
          <Button bg="#f8f8f8" fontWeight="300">
            Undelegations (0)
          </Button>
        </ButtonGroup>
        <DelegatorsTable />
      </Box>
    </Box>
  );
};
