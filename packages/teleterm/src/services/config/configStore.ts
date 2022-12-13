import { z, ZodIssue } from 'zod';

import { FileStorage } from 'teleterm/services/fileStorage';
import Logger from 'teleterm/logger';

const logger = new Logger('ConfigStore');

export function createConfigStore<
  Schema extends z.AnyZodObject,
  Shape = z.infer<Schema>
>(schema: Schema, defaults: Shape, fileStorage: FileStorage) {
  const parsed = parse(fileStorage.get());
  updateConfigFile();

  function get<K extends keyof Shape>(
    key: K
  ): { value: Shape[K]; metadata: { isStored: boolean } } {
    const stored = fileStorage.get<Shape>();
    return {
      value: { ...defaults, ...stored }[key],
      metadata: { isStored: stored[key] !== undefined },
    };
  }

  function set<K extends keyof Shape>(key: K, value: Shape[K]): void {
    fileStorage.putKey(key as string, value);
  }

  function getParsingErrors(): ZodIssue[] | undefined {
    if (parsed.success === false) {
      return parsed.error.issues;
    }
  }

  function parse(data: Shape) {
    return schema
      .partial() // make all keys optional
      .safeParse(data);
  }

  function updateConfigFile(): void {
    if (parsed.success === true) {
      fileStorage.put(parsed.data); // parsed.data does not contain unknown keys
    } else {
      const withoutInvalidProperties = { ...fileStorage.get<Shape>() };
      parsed.error.issues.forEach(error => {
        // remove only top-level keys
        delete withoutInvalidProperties[error.path[0]];
        logger.info(
          `Removed invalid config key, error: ${
            error.message
          } at ${error.path.join('.')}`
        );
      });
      const reParsed = parse(withoutInvalidProperties);
      if (reParsed.success === false) {
        // it should not occur after removing invalid keys, but just in case
        throw new Error('Re-parsing config file failed', reParsed.error.cause);
      }
      fileStorage.put(reParsed.data);
    }
  }

  return { get, set, getParsingErrors };
}
