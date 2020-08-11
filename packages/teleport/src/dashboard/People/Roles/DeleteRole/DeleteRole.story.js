import React from 'react';
import DeleteRole from './DeleteRole';

export const DeleteRoleDialog = () => <DeleteRole {...props} />;

DeleteRoleDialog.story = {
  name: 'Teleport/Roles/DeleteRoleDialog',
};

const props = {
  name: 'sample-role',
  onDelete: () => {
    return Promise.reject(new Error('server error'));
  },
  onClose: () => null,
};
