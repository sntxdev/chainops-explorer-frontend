import { ValidatorsTable } from '../../components';
import { Text } from '@chakra-ui/react';
import React from 'react';

const Validators = () => {
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Validators
      </Text>
      <ValidatorsTable />
    </>
  );
};

export default Validators;
