/*
Copyright 2019 Gravitational, Inc.

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
import Dialog, {
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from './index';
import { ButtonPrimary, Input, LabelInput } from './..';

export default {
  title: 'Design/Dialog/Basic',
};

export const Basic = () => (
  <Dialog open={true}>
    <DialogHeader>
      <DialogTitle>Header title</DialogTitle>
    </DialogHeader>
    <DialogContent width="400px">
      <p>Some text and other elements inside content</p>
      <LabelInput>Input</LabelInput>
      <Input />
    </DialogContent>
    <DialogFooter>
      <ButtonPrimary onClick={() => null}>Save And Close</ButtonPrimary>
    </DialogFooter>
  </Dialog>
);
