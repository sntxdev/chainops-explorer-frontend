import React from 'react';
import ClientOnly from '../../components/ClientOnly';
import { Text } from '@chakra-ui/react';
import { ValidatorsTable } from '../../components/Validators/ValidatorsTable';

const ValidatorsPage = () => {
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Validators
      </Text>
      <ClientOnly>
        <ValidatorsTable />
      </ClientOnly>
    </>
  );
};

export default ValidatorsPage;
