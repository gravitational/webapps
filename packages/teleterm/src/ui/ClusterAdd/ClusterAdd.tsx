/**
 * Copyright 2021 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import Dialog from 'design/Dialog';
import * as Alerts from 'design/Alert';
import { Box, Text, Flex, ButtonPrimary, ButtonSecondary } from 'design';
import FieldInput from 'shared/components/FieldInput';
import Validation from 'shared/components/Validation';
import { requiredField } from 'shared/components/Validation/rules';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import useAsync from 'teleterm/ui/useAsync';

export default function AddCluster({ onClose }: Props) {
  const [addr, setAddr] = useState('');
  const ctx = useAppContext();
  const [{ status, statusText, data: cluster }, run] = useAsync(() => {
    return ctx.serviceClusters.addRootCluster(addr);
  });

  React.useEffect(() => {
    if (status === 'success') {
      ctx.serviceModals.openLoginDialog(cluster.uri);
    }
  }, [status]);

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({
            maxWidth: '480px',
            width: '100%',
            padding: '0',
          })}
          disableEscapeKeyDown={false}
          onClose={onClose}
          open={true}
        >
          <Flex
            flex="1"
            minHeight="40px"
            as="form"
            px={3}
            py={3}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex flexDirection="column">
              <Text mb={1} typography="h4">
                Enter cluster address
              </Text>
              <Text mb={5} color="text.secondary" typography="h5">
                For example, https://teleport.example.com
              </Text>
              {status === 'error' && (
                <Alerts.Danger mb={5} children={statusText} />
              )}
              <FieldInput
                rule={requiredField('Cluster address is required')}
                value={addr}
                autoFocus
                onChange={e => setAddr(e.target.value)}
                placeholder="https://cluster"
              />
            </Flex>
            <Box mt="5">
              <ButtonPrimary
                disabled={status === 'processing'}
                mr="3"
                onClick={e => {
                  e.preventDefault();
                  validator.validate() && run();
                }}
              >
                Next
              </ButtonPrimary>
              <ButtonSecondary
                disabled={status === 'processing'}
                onClick={e => {
                  e.preventDefault();
                  onClose();
                }}
              >
                CANCEL
              </ButtonSecondary>
            </Box>
          </Flex>
        </Dialog>
      )}
    </Validation>
  );
}

export type Props = {
  onClose(): void;
};
