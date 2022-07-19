/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { getOriginPrivateDirectory } from 'native-file-system-adapter';

test('accessing the origin private file system', async () => {
  const root = await getOriginPrivateDirectory();
  // Create a new file handle.
  const fileHandle = await root.getFileHandle('Untitled.txt', { create: true });
  // Create a new directory handle.
  const dirHandle = await root.getDirectoryHandle('New Folder', {
    create: true,
  });
  // Recursively remove a directory.
  await root.removeEntry('Old Stuff', { recursive: true });

  expect(true).toBe(true);
});
