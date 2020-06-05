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
import styled from 'styled-components';
import { Cell } from 'design/DataTable';
import Icon, * as Icons from 'design/Icon/Icon';
import { CodeEnum } from 'teleport/services/audit/types';

const EventIconMap = {
  [CodeEnum.ALERT_CREATED]: Icons.NotificationsActive,
  [CodeEnum.ALERT_DELETED]: Icons.NotificationsActive,
  [CodeEnum.APPLICATION_INSTALL]: Icons.AppInstalled,
  [CodeEnum.APPLICATION_ROLLBACK]: Icons.AppRollback,
  [CodeEnum.APPLICATION_UNINSTALL]: Icons.PhonelinkErase,
  [CodeEnum.APPLICATION_UPGRADE]: Icons.PhonelinkSetup,
  [CodeEnum.ROLE_CREATED]: Icons.ClipboardUser,
  [CodeEnum.ROLE_DELETED]: Icons.ClipboardUser,
  [CodeEnum.AUTHGATEWAY_UPDATED]: Icons.Config,
  [CodeEnum.AUTH_ATTEMPT_FAILURE]: Icons.VpnKey,
  [CodeEnum.EXEC]: Icons.Code,
  [CodeEnum.EXEC_FAILURE]: Icons.Code,
  [CodeEnum.OPERATION_EXPAND_COMPLETE]: Icons.SettingsOverscan,
  [CodeEnum.OPERATION_EXPAND_START]: Icons.SettingsOverscan,
  [CodeEnum.GITHUB_CONNECTOR_CREATED]: Icons.NoteAdded,
  [CodeEnum.GITHUB_CONNECTOR_DELETED]: Icons.NoteAdded,
  [CodeEnum.OPERATION_INSTALL_COMPLETE]: Icons.Unarchive,
  [CodeEnum.OPERATION_INSTALL_START]: Icons.Unarchive,
  [CodeEnum.OPERATION_INSTALL_FAILURE]: Icons.Unarchive,
  [CodeEnum.LICENSE_EXPIRED]: Icons.NoteAdded,
  [CodeEnum.LICENSE_UPDATED]: Icons.NoteAdded,
  [CodeEnum.LOGFORWARDER_CREATED]: Icons.ForwarderAdded,
  [CodeEnum.LOGFORWARDER_DELETED]: Icons.ForwarderAdded,
  [CodeEnum.UPDATES_DISABLED]: Icons.Restore,
  [CodeEnum.UPDATES_DOWNLOADED]: Icons.Restore,
  [CodeEnum.UPDATES_ENABLED]: Icons.Restore,
  [CodeEnum.REMOTE_SUPPORT_ENABLED]: Icons.LanAlt,
  [CodeEnum.REMOTE_SUPPORT_DISABLED]: Icons.LanAlt,
  [CodeEnum.OPERATION_ENV_COMPLETE]: Icons.Memory,
  [CodeEnum.OPERATION_ENV_FAILURE]: Icons.Memory,
  [CodeEnum.OPERATION_ENV_START]: Icons.NoteAdded,
  [CodeEnum.SAML_CONNECTOR_DELETED]: Icons.NoteAdded,
  [CodeEnum.SCP_DOWNLOAD]: Icons.Download,
  [CodeEnum.SCP_DOWNLOAD_FAILURE]: Icons.Download,
  [CodeEnum.SCP_UPLOAD]: Icons.Upload,
  [CodeEnum.SCP_DOWNLOAD_FAILURE]: Icons.Upload,
  [CodeEnum.OPERATION_SHRINK_COMPLETE]: Icons.Shrink,
  [CodeEnum.OPERATION_SHRINK_FAILURE]: Icons.Shrink,
  [CodeEnum.OPERATION_SHRINK_START]: Icons.Shrink,
  [CodeEnum.SMTPCONFIG_CREATED]: Icons.EmailSolid,
  [CodeEnum.SMTPCONFIG_DELETED]: Icons.EmailSolid,
  [CodeEnum.TLSKEYPAIR_CREATED]: Icons.Keypair,
  [CodeEnum.TLSKEYPAIR_DELETED]: Icons.Keypair,
  [CodeEnum.TOKEN_CREATED]: Icons.Stars,
  [CodeEnum.TOKEN_DELETED]: Icons.Stars,
  [CodeEnum.USER_CREATED]: Icons.UserCreated,
  [CodeEnum.USER_DELETED]: Icons.UserCreated,
  [CodeEnum.USER_INVITE_CREATED]: Icons.PersonAdd,
  [CodeEnum.USER_LOCAL_LOGIN]: Icons.Person,
  [CodeEnum.USER_LOCAL_LOGINFAILURE]: Icons.Person,
  [CodeEnum.USER_SSO_LOGIN]: Icons.Person,
  [CodeEnum.USER_SSO_LOGINFAILURE]: Icons.Person,
  [CodeEnum.SESSION_START]: Icons.Cli,
  [CodeEnum.SESSION_JOIN]: Icons.Cli,
  [CodeEnum.TERMINAL_RESIZE]: Icons.Cli,
  [CodeEnum.SESSION_LEAVE]: Icons.Cli,
  [CodeEnum.SESSION_END]: Icons.Cli,
  [CodeEnum.SESSION_UPLOAD]: Icons.Cli,
};

export default function TypeCell(props) {
  const { rowIndex, data } = props;
  const { codeDesc, code } = data[rowIndex];
  const IconType = EventIconMap[code] || Icons.List;

  return (
    <Cell>
      <StyledEventType>
        <Icon p="1" mr="3" as={IconType} fontSize="3" />
        {codeDesc}
      </StyledEventType>
    </Cell>
  );
}

const StyledEventType = styled.div`
  display: flex;
  align-items: center;
  min-width: 130px;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
`;
