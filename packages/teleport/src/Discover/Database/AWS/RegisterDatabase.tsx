import React from 'react';

import { requiredField } from 'shared/components/Validation/rules';

import useAttempt from 'shared/hooks/useAttemptNext';
import { Danger } from 'design/Alert';

import { Box } from 'design';

import { Header, HeaderSubtitle } from 'teleport/Discover/Shared';
import {
  RegisterDatabaseBase,
  RegisterDatabaseInput,
  RegisterDatabaseValues,
} from 'teleport/Discover/Database/CreateDatabase/CreateDatabase';
import { AgentStepProps } from 'teleport/Discover/types';

interface AWSDatabaseValues extends RegisterDatabaseValues {
  databaseName: string;
  databaseConnectionEndpoint: string;
  awsAccountID: string;
  awsResourceID: string;
}

export function RegisterDatabase(props: AgentStepProps) {
  const { attempt } = useAttempt('');

  function handleSubmit(values: AWSDatabaseValues) {
    props.updateAgentMeta({
      ...props.agentMeta,
      resourceName: values.databaseName,
      db: {
        name: values.databaseName,
        description: 'Description',
        type: 'na',
        protocol: 'postgres',
        labels: values.labels,
      },
    });

    props.nextStep();
  }

  return (
    <Box>
      <Header>Register a Database</Header>
      <HeaderSubtitle>Lorem ipsum dolores</HeaderSubtitle>

      {attempt.status === 'failed' && <Danger children={attempt.statusText} />}

      <RegisterDatabaseBase
        onSubmit={handleSubmit}
        disabled={attempt.status === 'processing'}
      >
        <RegisterDatabaseInput
          name="databaseName"
          label="Database Name"
          rule={requiredField('database name is required')}
          autoFocus
          placeholder="Enter database name"
        />
        <RegisterDatabaseInput
          name="databaseConnectionEndpoint"
          label="Database Connection Endpoint"
          rule={requiredField('database connection endpoint is required')}
          placeholder="Enter database connection endpoint"
        />
        <RegisterDatabaseInput
          name="awsAccountID"
          label="AWS Account ID"
          rule={requiredField('AWS account ID is required')}
          placeholder="123456789012"
        />
        <RegisterDatabaseInput
          name="awsResourceID"
          label="Resource ID"
          rule={requiredField('resource ID is required')}
          placeholder="arn:aws:rds-db:<region>:<account>:dbuser:<resource id>/iamuser"
        />
      </RegisterDatabaseBase>
    </Box>
  );
}
