/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export default function getPlatform() {
  if (typeof window !== 'undefined') {
    const userAgent = window.navigator.userAgent;

    return {
      isWin: userAgent.indexOf('Windows') >= 0,
      isMac: userAgent.indexOf('Macintosh') >= 0,
      isLinux: userAgent.indexOf('Linux') >= 0,
    };
  } else {
    const platform = process.platform;
    const isWin = platform === 'win32';
    const isMac = platform === 'darwin';

    return {
      isWin,
      isMac,
      isLinux: !isWin && !isMac,
    };
  }
}
