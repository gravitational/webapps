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
import styled from 'design/styled';

import { fontSize, margin, padding } from 'design/styled';
import { Icon } from 'design/Icon';

export const SideNavItemIcon = styled(Icon, [fontSize, margin, padding])``;

SideNavItemIcon.defaultProps = {
  mr: 3,
  ml: -6,
  fontSize: '16px',
  color: 'inherit',
};
