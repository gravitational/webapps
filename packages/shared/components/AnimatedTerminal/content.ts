export interface BufferEntry {
  id: number;
  text: string;
  isCommand: boolean;
  isCurrent: boolean;
}

export interface TerminalLine {
  text: string;
  isCommand: boolean;
  delay?: number;
}

function wait(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

export async function* createTerminalContent(
  lines: TerminalLine[]
): AsyncIterableIterator<BufferEntry[]> {
  let lineIndex = 0;
  let linePosition = 0;

  const buffer: BufferEntry[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (lineIndex < lines.length) {
      if (!lines[lineIndex].isCommand) {
        const delay = lines[lineIndex].delay;

        if (!isNaN(delay)) {
          await wait(delay);
        }

        buffer.push({
          id: lineIndex,
          text: lines[lineIndex].text,
          isCommand: false,
          isCurrent: false,
        });

        yield buffer;

        linePosition = 0;
        lineIndex += 1;
      } else if (linePosition > lines[lineIndex].text.length) {
        buffer[lineIndex].isCurrent = lineIndex === lines.length - 1;
        linePosition = 0;
        lineIndex += 1;
      } else {
        const delay = lines[lineIndex].delay;

        if (!isNaN(delay)) {
          await wait(delay);
        }

        if (linePosition === 0) {
          buffer.push({
            id: lineIndex,
            text: '',
            isCommand: lines[lineIndex].isCommand,
            isCurrent: true,
          });
        }

        buffer[lineIndex].text = lines[lineIndex].text.substring(
          0,
          linePosition
        );

        linePosition += 1;
      }

      yield buffer;
    } else {
      return buffer;
    }
  }
}
