import { ValidatorsTable } from '../../components/Validators/ValidatorsTable';
import { Text } from '@chakra-ui/react';
import React from 'react';
import { gql } from '@apollo/client';

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

const Query = gql`
  query GetValidators {
    archway_validator {
      validator_description {
        avatar_url
        details
        identity
        moniker
        validator_address
        website
      }
      validator_info {
        consensus_address
        operator_address
        self_delegate_address
      }
      validator_status {
        jailed
        status
        tombstoned
      }
    }
  }
`;
