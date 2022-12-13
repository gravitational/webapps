import { FileStorage } from 'teleterm/services/fileStorage';

export function createMockFileStorage(): FileStorage {
  let state = {};
  return {
    putKey(key: string, json: any) {
      state[key] = json;
    },

    put(json: any) {
      state = json;
    },

    get<T>(key?: string): T {
      return key ? state[key] : (state as T);
    },

    putAllSync() {},
  };
}
