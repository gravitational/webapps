import { ChildProcess } from 'child_process';

const TCP_PORT_MATCH = /\{CONNECT_GRPC_PORT:\s(\d+)}/;

export async function resolveNetworkAddress(
  requestedAddress: string,
  process: ChildProcess,
  timeoutMs = 10_000 // 10s
): Promise<string> {
  // UDS
  if (new URL(requestedAddress).protocol === 'unix:') {
    return requestedAddress;
  }

  // TCP
  const matchResult = await waitForMatchInStdout(
    TCP_PORT_MATCH,
    requestedAddress,
    process,
    timeoutMs
  );
  return `localhost:${matchResult[1]}`;
}

function waitForMatchInStdout(
  regex: RegExp,
  requestedAddress: string,
  process: ChildProcess,
  timeoutMs: number
): Promise<RegExpMatchArray> {
  return new Promise((resolve, reject) => {
    process.stdout.setEncoding('utf-8');
    let chunks = '';

    const timeout = setTimeout(() => {
      rejectOnError(
        new Error(
          `Could not resolve address (${requestedAddress}) for process ${process.spawnfile}. The operation timed out.`
        )
      );
    }, timeoutMs);

    const removeListeners = () => {
      process.stdout.off('data', findAddressInChunk);
      process.off('error', rejectOnError);
      clearTimeout(timeout);
    };

    const findAddressInChunk = (chunk: string) => {
      chunks += chunk;
      const matchResult = chunks.match(regex);
      if (matchResult) {
        resolve(matchResult);
        removeListeners();
      }
    };

    const rejectOnError = (error: Error) => {
      reject(error);
      removeListeners();
    };

    process.stdout.on('data', findAddressInChunk);
    process.on('error', rejectOnError);
  });
}
