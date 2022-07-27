import { ChildProcess } from 'child_process';

const TCP_PORT_MATCH = /\{CONNECT_GRPC_PORT:\s(\d+)}/;
// Both the shared process and the tshd output the string no matter if TCP or UDS is used as a
// transport method.
const UDS_MATCH = /\{CONNECT_GRPC_PORT:/;

export async function resolveNetworkAddress(
  requestedAddress: string,
  process: ChildProcess,
  timeoutMs = 10_000 // 10s
): Promise<string> {
  const protocol = new URL(requestedAddress).protocol;

  switch (protocol) {
    case 'unix:': {
      // In case of UDS, we know the address upfront. Still, we wait for the process to emit the
      // message so that we know the server was started and accepts connections.
      await waitForMatchInStdout(
        UDS_MATCH,
        requestedAddress,
        process,
        timeoutMs
      );
      return requestedAddress;
    }
    case 'tcp:': {
      const matchResult = await waitForMatchInStdout(
        TCP_PORT_MATCH,
        requestedAddress,
        process,
        timeoutMs
      );
      return `localhost:${matchResult[1]}`;
    }
    default: {
      throw new Error(`Unknown protocol ${protocol}`);
    }
  }
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
        new ResolveError(requestedAddress, process, 'the operation timed out')
      );
    }, timeoutMs);

    const removeListeners = () => {
      process.stdout.off('data', findAddressInChunk);
      process.off('error', rejectOnError);
      process.off('exit', rejectOnExit);
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

    const rejectOnExit = (code: number, signal: NodeJS.Signals) => {
      const codeOrSignal = [
        code && `code ${code}`,
        signal && `signal ${signal}`,
      ]
        .filter(Boolean)
        .join(' and ');
      const details = codeOrSignal ? ` with ${codeOrSignal}` : '';
      rejectOnError(
        new ResolveError(
          requestedAddress,
          process,
          `the process exited${details}`
        )
      );
    };

    process.stdout.on('data', findAddressInChunk);
    process.on('error', rejectOnError);
    process.on('exit', rejectOnExit);
  });
}

class ResolveError extends Error {
  constructor(requestedAddress: string, process: ChildProcess, reason: string) {
    super(
      `Could not resolve address (${requestedAddress}) for process ${process.spawnfile}: ${reason}.`
    );
  }
}
