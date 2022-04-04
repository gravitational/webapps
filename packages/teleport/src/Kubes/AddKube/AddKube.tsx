/**
 * Copyright 2022 Gravitational, Inc.
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

import React, { useEffect, useState } from 'react';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'design/Dialog';
import Flex from 'design/Flex';
import { ButtonPrimary, ButtonSecondary } from 'design/Button';
import FieldInput from 'shared/components/FieldInput';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import Validation, { Validator } from 'shared/components/Validation';
import { Question } from 'design/Icon';
import Box from 'design/Box';
import Text from 'design/Text';
import useAddKube, { State } from './useAddKube';
import useTeleport from 'teleport/useTeleport';
import Alert from 'design/Alert';

export default function Container(props: Props) {
  const ctx = useTeleport();
  const state = useAddKube(ctx);
  return <AddKube {...state} {...props} />;
}

export function AddKube({
  onClose,
  attempt,
  createToken,
  expires,
  token,
}: Props & State) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [cmd, setCmd] = useState('');
  const [namespace, setNamespace] = useState('');
  const [clusterName, setClusterName] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    const generatedCmd = generateCmd(namespace, clusterName, host, token);
    setCmd(generatedCmd);
  }, [token]);

  function handleGenerate(validator: Validator) {
    // if (validator.valid) {
    //   return;
    // }

    createToken();
  }

  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
        minHeight: '328px',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <Validation>
        {({ validator }) => (
          <Flex flex="1" flexDirection="column">
            <DialogTitle mr="auto" mb="4">
              Add Kubernetes
            </DialogTitle>
            {attempt.status == 'failed' && (
              <Alert kind="danger" children={attempt.statusText} />
            )}
            <DialogContent minHeight="254px" flex="0 0 auto">
              <Box mb={4}>
                Install Teleport Agent in your cluster via Helm to easily
                connect your Kubernetes cluster with Teleport.
              </Box>
              <Box mb={4}>
                <Text>
                  <Text bold as="span">
                    Step 1
                  </Text>
                  {' - Add teleport-agent chart to charts repository'}
                </Text>
                <TextSelectCopy
                  text={
                    'helm repo add teleport https://charts.releases.teleport.dev && helm repo update'
                  }
                />
              </Box>
              <Box mb={4}>
                <Text bold as="span">
                  Step 2
                </Text>
                {' - Enter your cluster information'}

                <Flex alignItems="center" flexDirection="row">
                  <FieldInput
                    mb={2}
                    // rule={requiredAppName}
                    label="Namespace"
                    autoFocus
                    value={namespace}
                    placeholder="teleport"
                    width="320px"
                    mr="3"
                    // onKeyPress={e => handleEnterPress(e, validator)}
                    onChange={e => setNamespace(e.target.value)}
                    labelIcon={
                      <Question
                        style={{ margin: '0 0 4px 4px' }}
                        title="Information"
                      />
                    }
                  />
                  <FieldInput
                    mb={2}
                    // rule={requiredAppName}
                    label="Kubernetes Cluster Name"
                    autoFocus
                    value={clusterName}
                    placeholder="my-cluster"
                    width="320px"
                    mr="3"
                    // onKeyPress={e => handleEnterPress(e, validator)}
                    onChange={e => setClusterName(e.target.value)}
                    labelIcon={
                      <Question
                        style={{ margin: '0 0 4px 4px' }}
                        title="Information"
                      />
                    }
                  />
                </Flex>
              </Box>
              {cmd && (
                <Box>
                  <Text mt="3" mb="2" bold typography="h5">
                    Script Generated
                  </Text>
                  <Text mt="1">
                    The token will be valid for{' '}
                    <Text bold as={'span'}>
                      {expires}.
                    </Text>
                  </Text>
                  <TextSelectCopy text={cmd} mb={2} />
                  <Text>Tip: save the YAML file to apply updates later</Text>
                </Box>
              )}
            </DialogContent>
            <DialogFooter>
              <ButtonPrimary
                disabled={attempt.status === 'processing'}
                onClick={() => handleGenerate(validator)}
              >
                {cmd ? 'Regenerate Script' : 'Generate Script'}
              </ButtonPrimary>
              <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
            </DialogFooter>
          </Flex>
        )}
      </Validation>
    </Dialog>
  );
}

function generateCmd(
  namespace: string,
  clusterName: string,
  proxyAddr: string,
  token: string
) {
  return `cat << EOF > prod-cluster-values.yaml  
roles: kube   
authToken: ${token}   
proxyAddr: ${proxyAddr}   
kubeClusterName: ${clusterName}   
teleportVersionOverride: <proxy version>  
EOF  
    
helm repo add teleport https://charts.releases.teleport.dev && helm repo update
helm install -f prod-cluster-values.yaml --create-namespace --namespace ${namespace}`;
}

type Props = {
  onClose(): void;
};
