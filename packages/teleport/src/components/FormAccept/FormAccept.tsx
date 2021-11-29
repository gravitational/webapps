/*
Copyright 2021 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { Text, Card, ButtonPrimary, Flex, Box } from 'design';

export default function FormAccept(props: Props) {
  const {
    title = 'Get Started with Teleport',
    submitBtnText = 'Create Account',
    onSubmit,
  } = props;

  const boxWidth = '600px';

  return (
    <Card as="form" bg="primary.light" my={6} mx="auto" width={boxWidth}>
      <Flex>
        <Box flex="3" p="6">
          <Text typography="h2" mb={3} textAlign="center" color="light">
            {title}
          </Text>
          <Text typography="h4" breakAll mb={3} textAlign="center">
            Please click the link below to create an account
          </Text>
          <ButtonPrimary width="100%" mt={3} size="large" onClick={onSubmit}>
            {submitBtnText}
          </ButtonPrimary>
        </Box>
      </Flex>
    </Card>
  );
}

export type Props = {
  title?: string;
  submitBtnText?: string;
  onSubmit(): void;
};
