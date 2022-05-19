import React, { useState } from 'react';
import ClientOnly from '../../components/ClientOnly';
import { Button, Text } from '@chakra-ui/react';
import { ValidatorsTable } from '../../components/Validators/ValidatorsTable';

const ValidatorsPage = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      <Text mb="26px" fontSize="22px" fontWeight="medium" color="#323B5A">
        Validators
      </Text>
      <Button onClick={() => setIsActive(true)}>Active</Button>
      <Button onClick={() => setIsActive(false)} mx="8px">
        Inactive
      </Button>
      <ClientOnly>
        <ValidatorsTable isActive={isActive} />
      </ClientOnly>
    </>
  );
};

export default ValidatorsPage;
