import React, { useEffect, useRef, useState } from 'react';

import { AnimatedTerminal } from 'shared/components/AnimatedTerminal';
import { TerminalLine } from 'shared/components/AnimatedTerminal/content';

import { usePingTeleport } from 'teleport/Discover/Desktop/ConnectTeleport/PingTeleportContext';

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

const errors = ['✖', 'Oh', 'no!'];

const flip = ['_', '_', '_', '-', '`', '`', "'", '´', '-', '_', '_', '_'];

export function StartTeleportTerminalAnimation() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([...startLines]);

  const { active, found, timedOut, timeout } = usePingTeleport();

  const savedTimeout = useRef(0);
  useEffect(() => {
    if (found) {
      savedTimeout.current = null;

      return;
    }

    savedTimeout.current = timeout;
  }, [timeout, found]);

  const [ranConnectingAnimation, setRanConnectingAnimation] = useState(false);
  const [ranTimedOutAnimation, setRanTimedOutAnimation] = useState(false);
  const [ranConnectedAnimation, setRanConnectedAnimation] = useState(false);

  useEffect(() => {
    if (found && !ranConnectedAnimation) {
      setLines(lines => [
        ...lines,
        {
          isCommand: false,
          text: '',
        },
        {
          isCommand: false,
          text: '✔ Connected successfully',
        },
      ]);

      setRanConnectedAnimation(found);

      return;
    }

    if (ranConnectedAnimation) {
      return;
    }

    if (animationFinished && active && !ranConnectingAnimation) {
      setLines(lines => [
        ...lines,
        {
          isCommand: false,
          text: '',
        },
        {
          text: 'wait your.teleport.instance',
          isCommand: true,
          delay: 30,
        },
        {
          isCommand: false,
          text: '',
        },
        {
          isCommand: false,
          text: '- Waiting to hear from your Teleport node',
          frames: flip.map(spinner => {
            return () => {
              if (Date.now() > savedTimeout.current) {
                return { text: '- Waiting to hear from your Teleport node' };
              }

              const { minutes, seconds } = millisecondsToMinutesSeconds(
                savedTimeout.current - Date.now()
              );

              return {
                text: `${spinner} Waiting to hear from your Teleport node (${minutes}:${seconds} remaining)`,
                delay: 70,
              };
            };
          }),
        },
      ]);
    }

    if (timedOut && !ranTimedOutAnimation) {
      setLines(lines => [
        ...lines,
        {
          isCommand: false,
          text: '',
        },
        {
          isCommand: false,
          text: "✖ Oh no! We couldn't find your Teleport node.",
        },
      ]);
    }

    if (animationFinished) {
      setRanConnectingAnimation(active);
    }

    setRanTimedOutAnimation(timedOut);
  }, [
    found,
    timedOut,
    active,
    ranConnectedAnimation,
    ranTimedOutAnimation,
    ranConnectingAnimation,
    animationFinished,
  ]);

  return (
    <AnimatedTerminal
      lines={lines}
      startDelay={800}
      keywords={keywords}
      errors={errors}
      onCompleted={() => setAnimationFinished(true)}
    />
  );
}

function millisecondsToMinutesSeconds(ms: number) {
  if (ms < 0) {
    return { minutes: 0, seconds: 0 };
  }

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toFixed(0)
    .padStart(2, '0');

  return { minutes, seconds };
}
