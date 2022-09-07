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

import { Input } from '../Input';

import { LabelInput } from './LabelInput';

export default {
  title: 'Design/LabelInput',
};

export const Inputs = () => (
  <>
    <LabelInput>Label for Input</LabelInput>
    <Input />
    <LabelInput mt={4} hasError={true}>
      With Error
    </LabelInput>
    <Input hasError={true} />
  </>
);
