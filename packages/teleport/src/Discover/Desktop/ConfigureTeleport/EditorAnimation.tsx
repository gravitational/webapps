import React, { useEffect, useState } from 'react';

import { Editor, File, Language } from 'shared/components/Editor';
import { Note } from 'teleport/Discover/Desktop/ConfigureTeleport/Note';

const lines = `teleport:
  data_dir: /var/lib/teleport
  auth_servers:
    - your.teleport.cluster:3025`;

const pastedLines = `windows_desktop_service:
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
    content: lines,
  },
  {
    kind: EditorState.Pasted,
    content: `${lines}\n${pastedLines}`,
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
    <>
      <Editor title="Your IDE">
        <File language={Language.YAML} name="teleport.yaml" code={content} />
      </Editor>

      <Note />
    </>
  );
}
