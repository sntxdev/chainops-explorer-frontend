import { HorizontalBarChart } from './Charts';
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
  Progress,
} from '@chakra-ui/react';

export const GovernanceCard = () => {
  return (
    <Box
      height="330px"
      p={5}
      shadow="sm"
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Text as="span" fontSize="16px" fontWeight="medium" mr="14px">
          # 63
        </Text>
        <Text as="span" fontWeight="bold">
          Create Moonbeam Pool
        </Text>
        <Box
          ml="auto"
          fontSize="14px"
          fontWeight="bold"
          p="6px 20px"
          bg="#cff9e0"
          color="#0AC755"
          borderRadius="18px"
        >
          Passed
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" fontWeight="medium">
        <Box bg="#F4E9FC" mx="10px" p="20px 40px" textAlign="center" borderRadius="10px">
          <Text>Start Date</Text>
          <Text fontWeight="semibold">2021-01-01</Text>
        </Box>
        <Box bg="#F4E9FC" mx="10px" p="20px 40px" textAlign="center" borderRadius="10px">
          <Text>Turnout</Text>
          <Text fontWeight="semibold">65%</Text>
        </Box>
      </Box>
      <Progress colorScheme="green" height="26px" value={75} />
      {/*<HorizontalBarChart />*/}
    </Box>
  );
};
