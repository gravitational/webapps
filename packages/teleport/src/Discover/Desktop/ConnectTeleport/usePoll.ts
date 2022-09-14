import { useEffect, useRef, useState } from 'react';

export function usePoll(
  callback: (signal: AbortSignal) => Promise<boolean>,
  timeout: number,
  enabled: boolean,
  interval = 1000
) {
  const savedCallback = useRef(callback);
  const abortController = useRef(new AbortController());

  const [running, setRunning] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (enabled && !running) {
      savedCallback.current = callback;
      abortController.current = new AbortController();
      setResult(false);
      setTimedOut(false);
      setRunning(true);
    }

    if (!enabled && running) {
      setRunning(false);
    }
  }, [callback, enabled, running]);

  useEffect(() => {
    if (running && timeout > Date.now()) {
      const id = window.setTimeout(() => {
        setTimedOut(true);
      }, timeout - Date.now());

      return () => clearTimeout(id);
    }
  }, [running, timeout]);

  useEffect(() => {
    if (result) {
      return;
    }

    if (running) {
      const id = window.setInterval(async () => {
        try {
          const result = await savedCallback.current(
            abortController.current.signal
          );

          if (result) {
            clearInterval(id);
            setResult(true);
          }
          // eslint-disable-next-line no-empty
        } catch {}
      }, interval);

      return () => {
        clearInterval(id);
        abortController.current.abort();
      };
    }
  }, [running, result, timedOut, interval]);

  return { timedOut, result };
}
