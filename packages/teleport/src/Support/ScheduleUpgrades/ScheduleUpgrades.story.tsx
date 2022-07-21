/*
Copyright 2022 Gravitational, Inc.

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
import { ScheduleUpgrades, Props } from './ScheduleUpgrades';

export default {
  title: 'Teleport/Support/ScheduleUpgrades',
};

export const Loaded = () => {
  return <ScheduleUpgrades {...props} />;
};

export const Processing = () => {
  return (
    <ScheduleUpgrades
      {...props}
      attempt={{
        status: 'processing',
        statusText: '',
      }}
    />
  );
};

export const Failed = () => {
  return (
    <ScheduleUpgrades
      {...props}
      attempt={{
        status: 'failed',
        statusText: 'there was an error processing the request',
      }}
    />
  );
};

const props: Props = {
  onCancel: () => {},
  onSave: () => {},
  attempt: {
    status: '',
    statusText: '',
  } as any,
  onSelectedWindowChange: () => {},
  selectedWindow: '08:00:00',
};
