import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  SelectedLines,
  TerminalContent,
} from 'shared/components/AnimatedTerminal/TerminalContent';

import { Window } from 'shared/components/Window';

import { BufferEntry, createTerminalContent, TerminalLine } from './content';

interface AnimatedTerminalProps {
  lines: TerminalLine[];
  startDelay?: number;
  keywords?: string[];
  errors?: string[];
  args?: string[];
  selectedLines?: SelectedLines;
  stopped?: boolean;
  onCompleted?: () => void;
}

export function AnimatedTerminal(props: AnimatedTerminalProps) {
  const lastLineIndex = useRef(0);
  const content = useMemo(
    () => createTerminalContent(props.lines, lastLineIndex.current),
    [props.lines]
  );

  const [counter, setCounter] = useState(0);
  const [completed, setCompletedState] = useState(false);
  const [lines, setLines] = useState<BufferEntry[]>([]);

  function setCompleted(completed: boolean) {
    setCompletedState(completed);
    if (completed) {
      props.onCompleted && props.onCompleted();
    }
  }

  useEffect(() => {
    let timeout;
    let interval;

    function setup() {
      interval = setInterval(async () => {
        const { value, done } = await content.next();

        if (value) {
          if (value.length) {
            const nextLineIndex = value[value.length - 1].id + 1;
            if (nextLineIndex > lastLineIndex.current) {
              lastLineIndex.current = nextLineIndex;
            }
          }

          setLines(value);
          setCounter(count => count + 1);
        }

        if (done) {
          setCompleted(true);
        }
      }, 1000 / 60);
    }

    if (!props.startDelay) {
      setup();
    } else {
      timeout = setTimeout(setup, props.startDelay);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [props.startDelay, props.lines, content]);

  let renderedLines = lines;
  if (props.stopped) {
    renderedLines = props.lines.map((line, index) => ({
      id: index,
      text: line.text,
      isCommand: line.isCommand,
      isCurrent: index === props.lines.length - 1,
    }));
  }

  return (
    <Window title="Terminal">
      <TerminalContent
        lines={renderedLines}
        completed={completed}
        counter={counter}
        args={props.args}
        keywords={props.keywords}
        errors={props.errors}
        selectedLines={props.selectedLines}
      />
    </Window>
  );
}
