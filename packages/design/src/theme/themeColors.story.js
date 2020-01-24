/*
Copyright 2020 Gravitational, Inc.

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
import { Flex, Box } from '..';
import theme from './theme';

export default {
  title: 'Design/Theme',
};

export const PrimaryColors = () =>
  colorBoxGenerator(theme.colors.primary, 'primary');

export const SecondaryColors = () =>
  colorBoxGenerator(theme.colors.secondary, 'secondary');

export const TextColors = () => colorBoxGenerator(theme.colors.text, 'text');

export const ErrorColors = () => colorBoxGenerator(theme.colors.error, 'error');

export const ActionColors = () =>
  colorBoxGenerator(theme.colors.action, 'action');

export const GeneralColors = () => colorBoxGenerator(theme.colors);

const keysToSkip = ['primary', 'secondary', 'text', 'grey', 'error', 'action'];

const colorBoxGenerator = (colors, themeType = null) => {
  const list = Object.keys(colors).map(key => {
    if (!themeType && keysToSkip.includes(key)) {
      return false;
    }

    const commonPath = `theme.colors`;

    const fullPath = themeType
      ? `${commonPath}.${themeType}.${key}`
      : `${commonPath}.${key}`;

    return (
      <Flex flexWrap="wrap" mb={4} key={`${key}${colors[key]}`}>
        <Box>{fullPath}</Box>
        <Box width="100%" height="50px" bg={colors[key]} p={3} mr={3} />
      </Flex>
    );
  });

  return <>{list}</>;
};
