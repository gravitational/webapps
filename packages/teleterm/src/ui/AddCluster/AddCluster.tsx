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
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import { Box, Text, Flex, ButtonPrimary, ButtonSecondary, Link } from 'design';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import { requiredField } from 'shared/components/Validation/rules';
import * as Icons from 'design/Icon';
import CmdText from 'gravity/components/CmdText';

export default function AddCluster({ onClose, onNext }: Props) {
  const [addr, setAddr] = useState('');
  const handleOK = () => {
    //apt.addCluster(add)
    // const [ cluster, status, statusText ] = await ctx.addCluster(add)
    // ctx.storeApp.addCluster(cluster)
  };

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({
            maxWidth: '800px',
            width: '100%',
            padding: '0',
          })}
          disableEscapeKeyDown={false}
          onClose={close}
          open={true}
        >
          <Flex flex="1" minHeight="400px">
            <Flex
              flex="1"
              m={5}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Flex flexDirection="column">
                <Text mb={1} typography="h2">
                  First, add your cluster address
                </Text>
                <Text mb={5} color="text.secondary" typography="h5">
                  For example, https://teleport.example.com
                </Text>
                <FieldInput
                  maxWidth="380px"
                  rule={requiredField('Cluster address is required')}
                  value={addr}
                  autoFocus
                  onChange={e => setAddr(e.target.value)}
                  placeholder="https://cluster"
                />
              </Flex>
              <Box mt="5">
                <ButtonPrimary
                  mr="3"
                  onClick={() => validator.validate() && onNext(addr)}
                >
                  Next
                </ButtonPrimary>
                <ButtonSecondary onClick={onClose}>CANCEL</ButtonSecondary>
              </Box>
            </Flex>
            <Flex width="300px" flexDirection="column" bg="primary.light">
              <Icons.Add
                style={{ textAlign: 'center' }}
                fontSize="150px"
                color="primary.lighter"
              />
            </Flex>
          </Flex>
        </Dialog>
      )}
    </Validation>
  );
}

export type Props = {
  onClose(): void;
};

/*

      <FieldInput
              rule={requiredField('Cluster address is required')}
              label="Cluster URL"
              value={addr}
              onChange={e => setAddr(e.target.value)}
              placeholder="https://cluster"
            />

            <Flex
              width="250px"
              bg="primary.light"
              alignItems="center"
              justifyContent="center"
            >
              No Existing Log Forwarders
            </Flex>

*/
