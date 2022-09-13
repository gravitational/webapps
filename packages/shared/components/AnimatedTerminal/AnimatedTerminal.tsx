import React, { useEffect, useMemo, useState } from 'react';

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
  args?: string[];
  selectedLines?: SelectedLines;
  stopped?: boolean;
}

export function AnimatedTerminal(props: AnimatedTerminalProps) {
  const [lastLineIndex, setLastLineIndex] = useState(0);
  const content = useMemo(
    () => createTerminalContent(props.lines, lastLineIndex),
    [props.lines, lastLineIndex]
  );

  const [counter, setCounter] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [lines, setLines] = useState<BufferEntry[]>([]);

  useEffect(() => {
    let timeout;
    let interval;

    function setup() {
      let lastIndex = 0;
      interval = setInterval(async () => {
        const { value, done } = await content.next();

        if (value) {
          lastIndex = value[value.length - 1].id;

          setLines(value);
          setCounter(count => count + 1);
        }

        if (done) {
          setLastLineIndex(lastIndex + 1);
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
  }, [props.startDelay, content]);

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
        selectedLines={props.selectedLines}
      />
    </Window>
  );
}
