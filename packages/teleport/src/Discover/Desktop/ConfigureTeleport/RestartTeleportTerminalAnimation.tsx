import React from 'react';

import { AnimatedTerminal } from 'shared/components/AnimatedTerminal';

const lines = [
  {
    text: 'sudo systemctl reload teleport',
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
    text: '',
    isCommand: true,
  },
];

export function RestartTeleportTerminalAnimation() {
  return (
    <AnimatedTerminal lines={lines} startDelay={800} />
  );
}
