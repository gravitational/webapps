/*
Copyright 2019-2020 Gravitational, Inc.

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
import DeleteRole from './DeleteRole';

export const DeleteRoleDialog = () => <DeleteRole {...props} />;

DeleteRoleDialog.story = {
  name: 'TeleportDashboard/Roles/DeleteRoleDialog',
};

const props = {
  name: 'sample-role',
  onDelete: () => {
    return Promise.reject(new Error('server error'));
  },
  onClose: () => null,
};
