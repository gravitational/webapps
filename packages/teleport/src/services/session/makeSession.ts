/**
 * Copyright 2021 Gravitational, Inc.
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
import { Session, BearerToken } from './types';

export function makeSession(json: any): Session {
  return {
    token: makeBearerToken(json),
    expires: json.sessionExpires,
  };
}

export function makeBearerToken(json: any): BearerToken {
  return {
    accessToken: json.token,
    expiresIn: json.expires_in,
    created: new Date().getTime(),
  };
}
