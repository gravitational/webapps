import React, { useEffect, useState } from 'react';

import { AnimatedTerminal } from 'shared/components/AnimatedTerminal';
import { TerminalLine } from 'shared/components/AnimatedTerminal/content';

const startLines = [
  {
    text: 'sudo systemctl start teleport',
    isCommand: true,
    delay: 30,
  },
  {
    text: 'sudo systemctl status teleport',
    isCommand: true,
    delay: 30,
  },
  {
    text: `• teleport.service - Teleport SSH Service
   Loaded: loaded
   Active: active (running)`,
    isCommand: false,
    delay: 1000,
  },
  {
    text: "logout # We'll take it from here",
    isCommand: true,
    delay: 30,
  },
  {
    text: '\n\n',
    isCommand: false,
    delay: 30,
  },
  {
    text: 'wait your.teleport.instance',
    isCommand: true,
    delay: 30,
  },
  {
    text: 'Waiting to hear from your Teleport node...',
    delay: 1000,
    isCommand: false,
  },
];

const connectedLines = [
  {
    text: '✔ Connected successfully',
    delay: 30,
    isCommand: false,
  },
];

const keywords = [
  'sudo',
  'systemctl',
  'active',
  '\\(running\\)',
  '•',
  'wait',
  'logout',
  '✔',
];

interface StartTeleportTerminalAnimationProps {
  connected: boolean;
}

export function StartTeleportTerminalAnimation(
  props: StartTeleportTerminalAnimationProps
) {
  const [lines, setLines] = useState<TerminalLine[]>([...startLines]);

  useEffect(() => {
    if (props.connected) {
      setLines([...startLines, ...connectedLines]);
    }
  }, [props.connected]);

  return (
    <AnimatedTerminal lines={lines} startDelay={800} keywords={keywords} />
  );
}
