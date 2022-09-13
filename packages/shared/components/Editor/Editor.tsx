import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import {
  WindowCode,
  WindowContainer,
  WindowContentContainer,
  WindowTitleBar,
} from 'shared/components/Window';
import { Tabs } from 'shared/components/Editor/Tabs';
import { Language } from 'shared/components/Editor/Language';

import { File, FileProps } from './File';

interface EditorProps {
  title: string;
}

export function Editor(props: React.PropsWithChildren<EditorProps>) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const files = React.Children.map(
    props.children,
    (child: React.ReactElement<FileProps>) => {
      if (child.type === File) {
        return {
          name: child.props.name,
          content: child.props.code,
          language: child.props.language,
        };
      }

      return null;
    }
  ).filter(Boolean);

  const tabs = files.map(file => file.name);

  const { content, language } = files[activeTabIndex];

  const parsed = parse(content, language);
  const numberOfLines = content.split('\n').length;

  const lineNumbers = [];
  for (let i = 0; i <= numberOfLines; i++) {
    lineNumbers.push(<LineNumber key={i} data-line-number={i + 1} />);
  }

  return (
    <WindowContainer>
      <WindowTitleBar title={props.title} />

      <Tabs
        items={tabs}
        activeIndex={activeTabIndex}
        onSelect={setActiveTabIndex}
      />

      <WindowContentContainer style={{ height: 380 }}>
        <WindowCode style={{ display: 'flex' }}>
          <LineNumbers>{lineNumbers}</LineNumbers>
          <div>
            {parsed}
            <div>
              <Cursor />
            </div>
          </div>
        </WindowCode>
      </WindowContentContainer>
    </WindowContainer>
  );
}

function parse(code: string, language: Language) {
  switch (language) {
    case Language.YAML:
      return parseYAML(code);
    default:
      throw new Error('Language not supported');
  }
}

function parseYAML(code: string) {
  const lines = code.split('\n');

  const result = [];
  for (const [index, line] of lines.entries()) {
    const highlightHyphen = highlight(line, ' -', index);
    if (highlightHyphen) {
      result.push(highlightHyphen);

      continue;
    }

    const highlightSemicolon = highlight(line, ':', index);
    if (highlightSemicolon) {
      result.push(highlightSemicolon);
    }
  }

  return result;
}

function highlight(code: string, symbol: string, index: number) {
  if (!code.includes(symbol)) {
    return;
  }

  const symbolIndex = code.indexOf(symbol);

  return (
    <div key={index}>
      <Keyword>{code.substring(0, symbolIndex)}</Keyword>
      <Punctuation>{symbol}</Punctuation>
      {code.substring(symbolIndex + symbol.length, code.length)}
    </div>
  );
}

const Keyword = styled.span`
  color: #d4656b;
`;

const Punctuation = styled.span`
  color: #81ceee;
`;

const blink = keyframes`
  0% {
    opacity: 0;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 15px;
  background: #ffffff;
  vertical-align: middle;
  animation: ${blink} 1.5s steps(2) infinite;
`;

const LineNumbers = styled.div`
  user-select: none;
  width: 40px;
  color: rgba(255, 255, 255, 0.3);
`;

const LineNumber = styled.div`
  text-align: right;
  padding-right: 20px;
  &:before {
    content: attr(data-line-number);
  }
`;
