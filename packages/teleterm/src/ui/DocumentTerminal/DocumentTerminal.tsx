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

import React, { useRef, useEffect } from 'react';
import Document from 'teleterm/ui/Document';
import useDocTerminal, { Props } from './useDocumentTerminal';
import Terminal from './Terminal';
import { useDocumentCwdUpdater } from './useDocumentCwdUpdater';

export default function DocumentTerminal(props: Props & { visible: boolean }) {
  const { visible, doc } = props;
  const refTerminal = useRef<Terminal>();
  const { ptyProcess, openTerminalContextMenu } = useDocTerminal(doc);
  useDocumentCwdUpdater(doc, refTerminal.current);

  useEffect(() => {
    if (refTerminal?.current && ptyProcess && visible) {
      // when switching tabs or closing tabs, focus on visible terminal
      refTerminal.current.focus();
      window.dispatchEvent(new Event('resize'));
    }
  }, [visible, ptyProcess]);

  return (
    <Document
      visible={visible}
      flexDirection="column"
      pl={2}
      onContextMenu={openTerminalContextMenu}
    >
      {ptyProcess && <Terminal ptyProcess={ptyProcess} ref={refTerminal} />}
    </Document>
  );
}
