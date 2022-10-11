import React, { useEffect, useState } from 'react';

interface TimeoutProps {
  timeout: number; // ms
  message?: string;
  // mt is to specify margin top in pixels.
  mt?: number;
}

export function Timeout({ timeout, message, mt = 0 }: TimeoutProps) {
  const [, setCount] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() >= timeout) {
        clearInterval(interval);
      }

      setCount(count => count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeout]);

  const { minutes, seconds } = millisecondsToMinutesSeconds(
    timeout - Date.now()
  );

  return (
    <div css={{ marginTop: `${mt}px` }}>
      {message
        ? `${message} ${minutes}:${seconds}`
        : `This script is valid for another ${minutes}:${seconds}`}
    </div>
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
