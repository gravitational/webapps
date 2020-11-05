/*
Copyright 2020 Gravitational, Inc.

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

import makeAppBashCmd from './makeAppBashCmd';

describe('makeAppBashCmd', () => {
  const token = { id: '86', expiry: new Date('2019-05-13T20:18:09Z') };

  test.each`
    appName   | appUri                          | expected
    ${'test'} | ${'http://myapp'}               | ${`sudo bash -c "$(curl -fsSL 'http://localhost/scripts/86/install-app.sh?name=test&uri=http://myapp/')"`}
    ${'test'} | ${'http://myapp/test?a=3&b=4'}  | ${`sudo bash -c "$(curl -fsSL 'http://localhost/scripts/86/install-app.sh?name=test&uri=http://myapp/test%3Fa%3D3%26b%3D4')"`}
    ${'test'} | ${'http://myapp/test?a= 3&b=4'} | ${`sudo bash -c "$(curl -fsSL 'http://localhost/scripts/86/install-app.sh?name=test&uri=http://myapp/test%3Fa%3D%25203%26b%3D4')"`}
    ${'test'} | ${'http://myapp/test?a=| <> |'} | ${`sudo bash -c "$(curl -fsSL 'http://localhost/scripts/86/install-app.sh?name=test&uri=http://myapp/test%3Fa%3D%7C%2520%253C%253E%2520%7C')"`}
    ${'test'} | ${'http://myapp/test?a="dev"'}  | ${`sudo bash -c "$(curl -fsSL 'http://localhost/scripts/86/install-app.sh?name=test&uri=http://myapp/test%3Fa%3D%2522dev%2522')"`}
  `('test name and uri encoding', ({ appName, appUri, expected }) => {
    const cmd = makeAppBashCmd(token, appName, appUri);
    expect(cmd.text).toBe(expected);
  });
});
