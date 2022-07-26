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
import ace from 'ace-builds/src-min-noconflict/ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-searchbox';
import './ace-mode-bpf';
import treeBuilder from './treeBuilder';
import treeFormatter from './treeFormatter';
import flatFormatter from './flatFormatter';

export default class BpfViewer extends React.Component {
  componentDidMount() {
    const {
      readOnly = true,
      showGutter = true,
      theme = 'ace/theme/monokai',
    } = this.props;

    this.editor = ace.edit(this.ace_viewer);
    this.editor.setFontSize('14px');
    this.editor.setWrapBehavioursEnabled(true);
    this.editor.setHighlightActiveLine(false);
    this.editor.setShowInvisibles(false);
    this.editor.renderer.setShowPrintMargin(false);
    this.editor.renderer.setShowGutter(showGutter);
    this.editor.setReadOnly(readOnly);
    this.editor.setTheme(theme);
    this.editor.setOptions({ showLineNumbers: false });
    this.session = new ace.EditSession('');
    this.session.setUseWrapMode(false);
    this.session.setMode('ace/mode/grv_bpf');
    this.session.setOptions({ tabSize: 2, useSoftTabs: true });
    this.editor.setSession(this.session);
    this.editor.focus();
  }

  componentWillUnmount() {
    this.editor && this.editor.destroy();
    this.editor = null;
    this.session = null;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StyledTextEditor>
        <div ref={e => (this.ace_viewer = e)} />
      </StyledTextEditor>
    );
  }
}

export function formatEvents(events, mode) {
  const data = [];
  if (mode === 'tree') {
    const tree = treeBuilder(events);
    treeFormatter(tree, events, data);
  } else {
    flatFormatter(events, data);
  }

  return data;
}

const StyledTextEditor = styled.div`
  overflow: hidden;
  border-radius: 4px;
  flex: 1;
  display: flex;
  position: relative;
  border: none;
  background: ${props => props.theme.colors.bgTerminal};

  .ace-monokai {
    background: ${props => props.theme.colors.bgTerminal};
  }

  .ace-monokai .ace_marker-layer .ace_active-line {
    //background: #928787;
  }

  //.ace-monokai .ace_gutter,
  //.ace-monokai .ace_gutter-cell {
  //  color: rgba(255, 255, 255, 0.56);
  //  background: ${props => props.theme.colors.bgTerminal};
  //}

  > .ace_editor {
    position: absolute;
    line-height: 1.6;
    top: 8px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    font-family: ${props => props.theme.fonts.mono};
  }
`;
