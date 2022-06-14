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

import { getDownloadLink } from './links';
import type { Arch } from './links';

test('it returns the correct values for binary downloads', () => {
  const version = '9.3.5';
  const tests: [Arch, boolean, string][] = [
    ['macos', false, 'https://get.gravitational.com/teleport-9.3.5.pkg'],
    ['deb', false, 'https://get.gravitational.com/teleport_9.3.5_amd64.deb'],
    ['rpm', false, 'https://get.gravitational.com/teleport-9.3.5-1.x86_64.rpm'],
    ['macos', true, 'https://get.gravitational.com/teleport-ent-9.3.5.pkg'],
    ['deb', true, 'https://get.gravitational.com/teleport-ent_9.3.5_amd64.deb'],
    ['rpm', true, 'https://get.gravitational.com/teleport-ent-9.3.5-1.x86_64.rpm'],
  ];

  tests.forEach(t => expect(getDownloadLink(t[0], version, t[1])).toBe(t[2]))
});
