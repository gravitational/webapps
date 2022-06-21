import React, { useState } from 'react';
import { ButtonPrimary, Flex, Text } from 'design';
import LinearProgress from 'teleterm/ui/components/LinearProgress';
import Alerts from 'design/Alert';
import Validation from 'shared/components/Validation';
import { PortFieldInput } from './common';
import { DocumentGatewayProps } from './useDocumentGateway';

type OfflineDocumentGatewayProps = Pick<
  DocumentGatewayProps,
  'connectAttempt' | 'doc' | 'reconnect'
>;

export function OfflineDocumentGateway(props: OfflineDocumentGatewayProps) {
  const [port, setPort] = useState(props.doc.port);
  const statusDescription =
    props.connectAttempt.status === 'processing' ? 'being set up' : 'offline';
  const isProcessing = props.connectAttempt.status === 'processing';

  return (
    <Flex flexDirection="column" mx="auto" alignItems="center" mt={100}>
      <Text
        typography="h5"
        color="text.primary"
        mb={2}
        style={{ position: 'relative' }}
      >
        The database connection is {statusDescription}
        {props.connectAttempt.status === 'processing' && <LinearProgress />}
      </Text>
      {props.connectAttempt.status === 'error' && (
        <Alerts.Danger>{props.connectAttempt.statusText}</Alerts.Danger>
      )}
      <Flex
        as="form"
        onSubmit={() => props.reconnect(port)}
        alignItems="center"
        mt={3}
      >
        {props.connectAttempt.status === 'error' && (
          <Validation>
            <PortFieldInput
              label="Port (optional)"
              value={port}
              readonly={isProcessing}
              onChange={e => setPort(e.target.value)}
            />
          </Validation>
        )}
        <ButtonPrimary
          type="submit"
          mt={1}
          ml={2}
          width="100px"
          disabled={isProcessing}
        >
          Reconnect
        </ButtonPrimary>
      </Flex>
    </Flex>
  );
}
