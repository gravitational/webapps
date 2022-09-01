import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { BufferEntry } from 'shared/components/AnimatedTerminal/content';

interface TerminalContentProps {
  lines: BufferEntry[];
  completed: boolean;
  counter: number;
  keywords?: string[];
  args?: string[];
}

export function TerminalContent(props: TerminalContentProps) {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [props.counter]);

  return (
    <TerminalContentContainer ref={ref}>
      <TerminalCode>
        {renderLines(props.lines, props.keywords, props.args)}
      </TerminalCode>
    </TerminalContentContainer>
  );
}

function renderLines(lines: BufferEntry[], keywords: string[], args: string[]) {
  if (!lines.length) {
    return (
      <Prompt key="cursor">
        $ <Cursor />
      </Prompt>
    );
  }

  return lines.map(line => (
    <React.Fragment key={line.id}>
      {line.isCommand ? (
        <Prompt>${line.text.length > 0 ? ' ' : ''}</Prompt>
      ) : null}
      {formatText(line.text, line.isCommand, keywords, args)}
      {line.isCurrent ? <Cursor /> : null}
      <br />
    </React.Fragment>
  ));
}

function highlightWords(
  content: string,
  words: string[],
  color: string
) {
  const regex = new RegExp(`(${words.join('|')})`);

  if (regex.test(content)) {
    const split = content.split(regex);

    return split
      .map((item, index) => {
        if (!item) {
          return;
        }

        // all odd occurrences are matches, the rest remain unchanged
        if (index % 2 === 0) {
          return <span key={index}>{item}</span>;
        }

        return (
          <span key={index} style={{ color }}>
            {item}
          </span>
        );
      })
      .filter(Boolean);
  }

  return null;
}

function formatText(text: string, isCommand: boolean, keywords: string[], args: string[]) {
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

    if (keywords) {
      const highlightedWords = highlightWords(word, keywords, '#5af78e');
      if (highlightedWords) {
        result.push(
          <span style={{ userSelect: 'none' }} key={index}>
            {highlightedWords}{' '}
          </span>
        );

        continue;
      }
    }

    if (args) {
      const highlightedArguments = highlightWords(word, args, '#cfa7ff');
      if (highlightedArguments) {
        result.push(
          <span style={{ userSelect: 'none' }} key={index}>
            {highlightedArguments}{' '}
          </span>
        );

        continue;
      }
    }

    result.push(
      <span style={{ userSelect: 'none' }} key={index}>
        {word}{' '}
      </span>
    );
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
