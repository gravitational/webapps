import React, { useEffect, useMemo, useState } from 'react';

import { TerminalContent } from 'shared/components/AnimatedTerminal/TerminalContent';

import { Window } from 'shared/components/Window';

import { BufferEntry, createTerminalContent, TerminalLine } from './content';

interface AnimatedTerminalProps {
  lines: TerminalLine[];
  startDelay?: number;
}

export function AnimatedTerminal(props: AnimatedTerminalProps) {
  const content = useMemo(
    () => createTerminalContent(props.lines),
    [props.lines]
  );

  const [counter, setCounter] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [lines, setLines] = useState<BufferEntry[]>([]);

  useEffect(() => {
    let timeout;
    let interval;

    function setup() {
      interval = setInterval(async () => {
        const { value, done } = await content.next();

        if (value) {
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
  }, [props.startDelay]);

  return (
    <Window title="Terminal">
      <TerminalContent lines={lines} completed={completed} counter={counter} />
    </Window>
  );
}
