import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BufferEntry } from 'shared/components/AnimatedTerminal/content';

export interface SelectedLines {
  start: number;
  end: number;
}

interface TerminalContentProps {
  lines: BufferEntry[];
  completed: boolean;
  counter: number;
  keywords?: string[];
  args?: string[];
  selectedLines?: SelectedLines;
  errors?: string[];
}

const SelectedLinesOverlay = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  position: absolute;
  left: 0;
  z-index: 0;
`;

const Lines = styled.div`
  position: relative;
  z-index: 1;
`;

export function TerminalContent(props: TerminalContentProps) {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [props.counter]);

  const [renderedSelectedLineCount, setRenderedSelectedLineCount] = useState(0);

  useEffect(() => {
    if (props.selectedLines) {
      setRenderedSelectedLineCount(0);

      const numberOfLines = props.selectedLines.end - props.selectedLines.start;

      let count = 0;
      const timeout = window.setInterval(() => {
        setRenderedSelectedLineCount(count => count + 1);
        count += 1;

        if (count > numberOfLines) {
          clearTimeout(timeout);
        }
      }, 80);

      return () => clearInterval(timeout);
    }
  }, [props.selectedLines]);

  let selectedLines;
  if (props.selectedLines) {
    selectedLines = (
      <SelectedLinesOverlay
        style={{
          height: 20 * renderedSelectedLineCount,
          top: 20 * (props.selectedLines.start + 1),
        }}
      />
    );
  }

  return (
    <TerminalContentContainer ref={ref}>
      <TerminalCode>
        <Lines>
          {renderLines(props.lines, props.keywords, props.args, props.errors)}
        </Lines>

        {selectedLines}
      </TerminalCode>
    </TerminalContentContainer>
  );
}

function renderLines(
  lines: BufferEntry[],
  keywords: string[],
  args: string[],
  errors: string[]
) {
  if (!lines.length) {
    return (
      <Prompt key="cursor">
        $ <Cursor />
      </Prompt>
    );
  }

  const result = lines.map(line => (
    <React.Fragment key={line.id}>
      {line.isCommand ? (
        <Prompt>${line.text.length > 0 ? ' ' : ''}</Prompt>
      ) : null}
      {formatText(line.text, line.isCommand, keywords, args, errors)}
      {line.isCurrent ? <Cursor /> : null}
      <br />
    </React.Fragment>
  ));

  return result;
}

function highlightWords(
  content: string,
  words: string[],
  color: string,
  key: string
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
          <span key={`${key}-${index}`} style={{ color }}>
            {item}
          </span>
        );
      })
      .filter(Boolean);
  }

  return null;
}

function formatText(
  source: string,
  isCommand: boolean,
  keywords: string[],
  args: string[],
  errors: string[]
) {
  let text = source;
  let comment;

  const commentStartIndex = text.indexOf('#');
  if (commentStartIndex > -1) {
    text = source.substring(0, commentStartIndex);

    comment = (
      <Comment>{source.substring(commentStartIndex, source.length)}</Comment>
    );
  }

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
      const highlightedWords = highlightWords(
        word,
        keywords,
        '#5af78e',
        'keyword'
      );
      if (highlightedWords) {
        result.push(
          <span style={{ userSelect: 'none' }} key={`keywords-${index}`}>
            {highlightedWords}{' '}
          </span>
        );

        continue;
      }
    }

    if (args) {
      const highlightedArguments = highlightWords(word, args, '#cfa7ff', 'arg');
      if (highlightedArguments) {
        result.push(
          <span style={{ userSelect: 'none' }} key={`args-${index}`}>
            {highlightedArguments}{' '}
          </span>
        );

        continue;
      }
    }

    if (errors) {
      const highlightedErrors = highlightWords(
        word,
        errors,
        '#f07278',
        'error'
      );
      if (highlightedErrors) {
        result.push(
          <span style={{ userSelect: 'none' }} key={`errors-${index}`}>
            {highlightedErrors}{' '}
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

  return (
    <>
      {result}
      {comment}
    </>
  );
}

const Prompt = styled.span`
  user-select: none;
  color: rgb(204, 204, 204);
`;

const Comment = styled.span`
  user-select: none;
  color: rgb(255, 255, 255, 0.4);
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
  height: 425px;
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
  position: relative;
`;
