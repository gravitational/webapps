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
import ace from 'ace-builds/src-min-noconflict/ace';
import { Ace } from 'ace-builds/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-searchbox';
import StyledTextEditor from './StyledTextEditor';

const { UndoManager } = ace.require('ace/undomanager');

class TextEditor extends React.Component<Props> {
  ace_viewer: HTMLDivElement = null;
  sessions: Ace.EditSession[] = null;
  editor: Ace.Editor = null;
  isDirty = false;

  onChange = () => {
    // isAtBookmark() seems to be equivalent to isClean() which is not exposed.
    // https://github.com/ajaxorg/ace-builds/blob/master/src/ace.js#L14812
    const isClean = this.editor.session.getUndoManager().isAtBookmark();
    if (this.props.onDirty) {
      this.props.onDirty(!isClean);
    }

    const content = this.editor.session.getValue();
    if (this.props.onChange) {
      this.props.onChange(content);
    }
  };

  getData() {
    return this.sessions.map(s => s.getValue());
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.setActiveSession(this.props.activeIndex);
    }

    this.editor.resize();
  }

  createSession({ content, type = 'json', tabSize = 2 }: AceData) {
    const mode = getMode(type);
    let session = new ace.EditSession(content);
    let undoManager = new UndoManager();
    undoManager.markClean();
    session.setUndoManager(undoManager);
    session.setUseWrapMode(false);
    session.setMode(mode);
    session.setOptions({ tabSize, useSoftTabs: true });
    return session;
  }

  setActiveSession(index: number) {
    let activeSession = this.sessions[index];
    if (!activeSession) {
      activeSession = this.createSession({ content: '' });
    }

    this.editor.setSession(activeSession);
    this.editor.focus();
  }

  initSessions(data: AceData[]) {
    this.isDirty = false;
    this.sessions = data.map(item => this.createSession(item));
    this.setActiveSession(0);
  }

  componentDidMount() {
    const { data, readOnly, theme = 'ace/theme/monokai' } = this.props;
    this.editor = ace.edit(this.ace_viewer);
    this.editor.setFadeFoldWidgets(true);
    this.editor.setWrapBehavioursEnabled(true);
    this.editor.setHighlightActiveLine(false);
    this.editor.setShowInvisibles(false);
    this.editor.renderer.setShowGutter(false);
    this.editor.renderer.setShowPrintMargin(false);
    this.editor.renderer.setShowGutter(true);
    this.editor.on('input', this.onChange);
    this.editor.setReadOnly(readOnly);
    this.editor.setTheme(theme);
    this.initSessions(data);
    this.editor.focus();
  }

  componentWillUnmount() {
    this.editor.destroy();
    this.editor = null;
    this.sessions = null;
  }

  render() {
    return (
      <StyledTextEditor>
        <div ref={e => (this.ace_viewer = e)} />
      </StyledTextEditor>
    );
  }
}

export default TextEditor;

function getMode(docType = ''): AceMode {
  if (docType === 'json') {
    return 'ace/mode/json';
  }

  return 'ace/mode/yaml';
}

type Props = {
  onDirty?: Function;
  onChange?: (content: string) => void;
  activeIndex?: number;
  theme?: string;
  readOnly: boolean;
  data: AceData[];
};

type AceData = {
  type?: 'json' | 'yaml';
  tabSize?: number;
  content: string;
};

type AceMode = 'ace/mode/json' | 'ace/mode/yaml';
