import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { BufferEntry } from 'shared/components/AnimatedTerminal/content';

interface TerminalContentProps {
  lines: BufferEntry[];
  completed: boolean;
  counter: number;
}

export function TerminalContent(props: TerminalContentProps) {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [props.counter]);

  return (
    <TerminalContentContainer ref={ref}>
      <TerminalCode>{renderLines(props.lines)}</TerminalCode>
    </TerminalContentContainer>
  );
}

function renderLines(lines: BufferEntry[]) {
  return lines.map(line => (
    <React.Fragment key={line.id}>
      {line.isCommand ? (
        <Prompt>${line.text.length > 0 ? ' ' : ''}</Prompt>
      ) : null}
      {formatText(line.text, line.isCommand)}
      {line.isCurrent ? <Cursor /> : null}
      <br />
    </React.Fragment>
  ));
}

function formatText(text: string, isCommand: boolean) {
  const words = text.split(' ');
  const result = [];

  for (const [index, word] of words.entries()) {
    if (!isCommand && /(https?:\/\/\S+)/g.test(word)) {
      result.push(
        <React.Fragment key={index}>
          <a
            key={index}
            style={{ color: '#feaa01', textDecoration: 'underline' }}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
          >
            {word}
          </a>{' '}
        </React.Fragment>
      );

      continue;
    }

    if (word === '(Invoke-WebRequest') {
      result.push(
        <React.Fragment key={index}>
          <span>(</span>
          <span style={{ color: '#5af78e' }}>Invoke-WebRequest </span>
        </React.Fragment>
      );

      continue;
    }

    if (['-Uri'].includes(word)) {
      result.push(
        <span key={index} style={{ color: '#cfa7ff' }}>
          {word}{' '}
        </span>
      );

      continue;
    }

    if (
      [
        'sudo',
        'systemctl',
        'Invoke-Expression',
        'active',
        '(running)',
        '•',
      ].includes(word)
    ) {
      result.push(
        <span key={index} style={{ color: '#5af78e' }}>
          {word}{' '}
        </span>
      );

      continue;
    }

    result.push(<span key={index}>{word} </span>);
  }

  return <>{result}</>;
}

const Prompt = styled.span`
  user-select: none;
  color: rgb(204, 204, 204);
`;

const Cursor = styled.span`
  display: inline-block;
  width: 6px;
  height: 15px;
  background: #ffffff;
  vertical-align: middle;
`;

export const TerminalContentContainer = styled.div`
  background: #04162c;
  height: 385px;
  overflow-y: auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const TerminalCode = styled.div`
  font-size: 12px;
  font-family: Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace;
  line-height: 20px;
  white-space: pre-wrap;
  margin: 10px 16px;
`;
