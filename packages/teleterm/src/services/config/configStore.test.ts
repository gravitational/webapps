import { z } from 'zod';

import Logger, { NullService } from 'teleterm/logger';
import { createMockFileStorage } from 'teleterm/services/fileStorage/fixtures/mocks';

import { createConfigStore } from './configStore';

beforeAll(() => {
  Logger.init(new NullService());
});

const schema = z.object({
  monoFontFamily: z.string(),
  usageMetricsEnabled: z.boolean(),
});

test('stored and default properties are combined', () => {
  const fileStorage = createMockFileStorage();
  fileStorage.put({ usageMetricsEnabled: true });
  const configStore = createConfigStore(
    schema,
    {
      usageMetricsEnabled: false,
      monoFontFamily: 'Arial',
    },
    fileStorage
  );

  expect(configStore.getParsingErrors()).toBeUndefined();

  const usageMetricsEnabled = configStore.get('usageMetricsEnabled');
  expect(usageMetricsEnabled.value).toBe(true);
  expect(usageMetricsEnabled.metadata.isStored).toBe(true);

  const monoFontFamily = configStore.get('monoFontFamily');
  expect(monoFontFamily.value).toBe('Arial');
  expect(monoFontFamily.metadata.isStored).toBe(false);
});

test('invalid properties are removed and defaults are returned', () => {
  const fileStorage = createMockFileStorage();
  fileStorage.put({ usageMetricsEnabled: 'abcde' });
  const configStore = createConfigStore(
    schema,
    {
      usageMetricsEnabled: false,
      monoFontFamily: 'Arial',
    },
    fileStorage
  );

  expect(configStore.getParsingErrors()).toStrictEqual([
    {
      code: 'invalid_type',
      expected: 'boolean',
      received: 'string',
      message: 'Expected boolean, received string',
      path: ['usageMetricsEnabled'],
    },
  ]);

  const usageMetricsEnabled = configStore.get('usageMetricsEnabled');
  expect(usageMetricsEnabled.value).toBe(false);
  expect(usageMetricsEnabled.metadata.isStored).toBe(false);
});
