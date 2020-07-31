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

import { at } from 'lodash';
import moment from 'moment';
import { InviteToken } from './types';

export default function makeInviteToken(json): InviteToken {
  const [expireDate, createdDate, username, url] = at(json, [
    'metadata.expires',
    'spec.created',
    'spec.user',
    'spec.url',
  ]);

  // Create expire time in format h:m:s
  const end = moment(new Date(expireDate), 'HH:mm:ss');
  const start = moment(new Date(createdDate), 'HH:mm:ss');

  const milliseconds = end.diff(start);
  const d = moment.duration(milliseconds);

  const expires = `${d.hours()}h${d.minutes()}m${d.seconds()}s`;

  return {
    username,
    expires,
    url,
  };
}
