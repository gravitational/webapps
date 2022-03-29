import React from 'react';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'design/Dialog';
import Flex from 'design/Flex';
import { ButtonPrimary, ButtonSecondary } from 'design/Button';
import FieldInput from 'shared/components/FieldInput';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import Validation from 'shared/components/Validation';
import { Question } from 'design/Icon';
import Box from 'design/Box';
import Text from 'design/Text';

export function AddKube({ onClose }: Props) {
  const cmd = `helm install teleport-agent teleport/teleport-kube-agent --set kubeClusterName="cluster" --set proxyAddr="current-host" \
  --set authToken=generated-token --create-namespace --namespace=teleport-agent
`;
  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
        minHeight: '328px',
      })}
      disableEscapeKeyDown={false}
      // onClose={onClose}
      open={true}
    >
      <Flex flex="1" flexDirection="column">
        <DialogTitle mr="auto" mb="4">
          Add Kubernetes
        </DialogTitle>
        <DialogContent minHeight="254px" flex="0 0 auto">
          <Box mb={4}>
            <Text>Step 1: Add teleport-agent chart to charts repository</Text>
            <TextSelectCopy
              text={
                'helm repo add teleport https://charts.releases.teleport.dev && helm repo update'
              }
            />
          </Box>
          <Box mb={4}>
            <Text>Step 2: Enter your cluster information</Text>
            <Flex alignItems="center" flexDirection="row">
              <Validation>
                {({ validator }) => (
                  <>
                    <Flex>
                      <FieldInput
                        mb={2}
                        // rule={requiredAppName}
                        label="Namespace"
                        autoFocus
                        // value={name}
                        placeholder="teleport"
                        width="320px"
                        mr="3"
                        // onKeyPress={e => handleEnterPress(e, validator)}
                        onChange={e => console.log('todo', e)}
                        labelIcon={
                          <Question
                            style={{ margin: '0 0 4px 4px' }}
                            title="Information"
                          />
                        }
                      />
                    </Flex>
                    <FieldInput
                      mb={2}
                      // rule={requiredAppName}
                      label="Kubernetes Cluster Name"
                      autoFocus
                      // value={name}
                      placeholder="my-cluster"
                      width="320px"
                      mr="3"
                      // onKeyPress={e => handleEnterPress(e, validator)}
                      onChange={e => console.log('todo', e)}
                      labelIcon={
                        <Question
                          style={{ margin: '0 0 4px 4px' }}
                          title="Information"
                        />
                      }
                    />
                  </>
                )}
              </Validation>
            </Flex>

            <ButtonPrimary
            // disabled={attempt.status === 'processing'}
            // onClick={() => handleGenerate(validator)}
            >
              Generate Script
            </ButtonPrimary>
          </Box>
          <Text mt={3}>Step 3: Install Kubernetes agent.</Text>
          <TextSelectCopy text={cmd} mb={2} />
        </DialogContent>
        <DialogFooter>
          <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
        </DialogFooter>
      </Flex>
    </Dialog>
  );
}

type Props = {
  onClose(): void;
};

export default AddKube;
