/**
 * Copyright 2020 Gravitational, Inc.
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

import copyToClipboard from './copyToClipboard';

test('text gets copied for fallback and navigator.clipboard', () => {
  // test fallback execCommand
  Object.defineProperty(navigator, 'clipboard', {
    value: undefined,
    writable: true,
  });
  Object.defineProperty(document, 'execCommand', { value: jest.fn() });
  jest.spyOn(document.body, 'removeChild').mockImplementation();

  copyToClipboard('copied text');
  expect(document.querySelector('textarea').value).toBe('copied text');

  // test navigator.clipboard
  let writeText = jest.fn().mockResolvedValue('');
  Object.defineProperty(navigator, 'clipboard', { value: { writeText } });

  copyToClipboard('copied text');
  expect(writeText).toHaveBeenCalledWith('copied text');
});
