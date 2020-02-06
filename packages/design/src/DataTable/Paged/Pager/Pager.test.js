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

import React from 'react';
import Pager from './Pager';
import { render } from 'design/utils/testing';

describe('design/DataTable Pager', () => {
  test.each`
    startFrom    | endAt        | totalRows    | noPrevBtn | noNextBtn
    ${undefined} | ${undefined} | ${undefined} | ${true}   | ${true}
    ${2}         | ${5}         | ${10}        | ${false}  | ${false}
    ${0}         | ${5}         | ${10}        | ${true}   | ${false}
    ${1}         | ${5}         | ${5}         | ${false}  | ${true}
    ${1}         | ${2}         | ${0}         | ${true}   | ${true}
  `(
    'respects props: startFrom=$startFrom, endAt=$endAt, totalRows=$totalRows, noPrevBtn=$noPrevBtn, noNextBtn=$noNextBtn',
    ({ startFrom, endAt, totalRows, noPrevBtn, noNextBtn }) => {
      const { container } = render(
        <Pager startFrom={startFrom} endAt={endAt} totalRows={totalRows} />
      );

      const start = startFrom == null ? 0 : startFrom + 1;
      const end = endAt == null ? 0 : endAt;
      const total = totalRows == null ? 0 : totalRows;

      expect(container.firstChild.textContent).toEqual(
        `SHOWING ${start} to ${end} of ${total}`
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons[0].disabled).toBe(noPrevBtn);
      expect(buttons[1].disabled).toBe(noNextBtn);
    }
  );
});
