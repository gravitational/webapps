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

import React from 'react';
import { Card, Text, ButtonPrimary, Flex, Image } from 'design';

import shieldCheck from './shield-check.png';

export function RegisterSuccess({
  redirect,
  resetMode = false,
}: {
  redirect(): void;
  resetMode: boolean;
}) {
  const actionTxt = resetMode ? 'reset' : 'registration';
  return (
    <Card
      width="540px"
      p={6}
      bg="primary.light"
      mt={6}
      mx="auto"
      textAlign="center"
    >
      <Text
        typography="h3"
        color="text"
        mb={3}
        style={{ textTransform: 'capitalize' }}
      >
        {actionTxt} successful
      </Text>
      <Flex justifyContent="center" mb={3}>
        <Image src={shieldCheck} width="200px" height="143px" />
      </Flex>
      <Text fontSize={2} color="text.secondary" mb={4}>
        Congratulations your {actionTxt} is completed.
        <br />
        Proceed to access your account.
      </Text>
      <ButtonPrimary width="100%" size="large" onClick={redirect}>
        Go to Dashboard
      </ButtonPrimary>
    </Card>
  );
}
