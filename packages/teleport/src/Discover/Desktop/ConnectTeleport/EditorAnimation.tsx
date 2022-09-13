import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Editor, File, Language } from 'shared/components/Editor';

const pastedLines = `teleport:
  data_dir: /var/lib/teleport
  auth_token: thisisanexample
  auth_servers:
    - your.teleport.cluster:3025
windows_desktop_service:
  enabled: yes
  listen_addr: "0.0.0.0:3028"
  ldap:
    addr:     '0.0.0.0:636'
    domain:   'TELEPORT'
    username: 'you'
    insecure_skip_verify: false
    ldap_ca_cert: "----THIS IS AN EXAMPLE----"
  discovery:
    base_dn: '*'`;

enum EditorState {
  Original,
  Pasted,
}

const states = [
  {
    kind: EditorState.Original,
    content: '',
  },
  {
    kind: EditorState.Pasted,
    content: pastedLines,
  },
];

export function EditorAnimation() {
  const [editorState, setEditorState] = useState(EditorState.Original);

  const { content } = states.find(state => state.kind === editorState);

  useEffect(() => {
    setEditorState(EditorState.Original);

    const id = window.setTimeout(
      () => setEditorState(EditorState.Pasted),
      3000
    );

    return () => clearTimeout(id);
  }, []);

  return (
    <DisableUserSelect>
      <Editor title="Your IDE">
        <File
          language={Language.YAML}
          name="/etc/teleport.yaml"
          code={content}
        />
      </Editor>
    </DisableUserSelect>
  );
}

const DisableUserSelect = styled('div')`
  user-select: none;
`;
