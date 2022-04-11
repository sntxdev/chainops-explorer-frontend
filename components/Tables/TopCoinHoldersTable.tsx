import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box } from '@chakra-ui/react';

export const TopCoinHoldersTable = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody fontWeight="medium">
          <Tr>
            <Td py="10px">1</Td>
            <Td py="1px">iva1DRd562yc...231Fdf</Td>
            <Td py="1px" textAlign="right">
              43 214 124 atom
            </Td>
          </Tr>
          <Tr>
            <Td py="10px">2</Td>
            <Td py="1px">Effzghe1267gds1yc...231Fdf</Td>
            <Td py="1px" textAlign="right">
              201 231 atom
            </Td>
          </Tr>
          <Tr>
            <Td py="10px">3</Td>
            <Td py="1px">zvaddfhvf42...231Fdf</Td>
            <Td py="1px" textAlign="right">
              101 231 atom
            </Td>
          </Tr>
          <Tr>
            <Td py="10px">4</Td>
            <Td py="1px">fastycsAA124563...231Fdf</Td>
            <Td py="1px" textAlign="right">
              91 231 atom
            </Td>
          </Tr>
          <Tr>
            <Td py="10px">5</Td>
            <Td py="1px">gdredfgfgjhjstvj5434re...231Fdf</Td>
            <Td py="1px" textAlign="right">
              1 231 atom
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
