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

import {
  requiredToken,
  requiredPassword,
  requiredConfirmedPassword,
  requiredField,
} from './rules';

test('requiredField', () => {
  const provideValue = requiredField('mocked error message');

  const fnForValidValue = provideValue('my mocked value');
  expect(fnForValidValue()).toMatchInlineSnapshot(`
    Object {
      "message": "",
      "valid": true,
    }
  `);

  const fnForInvalidValue = provideValue('');
  expect(fnForInvalidValue()).toMatchInlineSnapshot(`
    Object {
      "message": "mocked error message",
      "valid": false,
    }
  `);

  const fnForNilValue = provideValue(null);
  expect(fnForNilValue()).toMatchInlineSnapshot(`
    Object {
      "message": "mocked error message",
      "valid": false,
    }
  `);
});

test('requiredToken', () => {
  const fnForValidValue = requiredToken('mocked token');
  expect(fnForValidValue()).toMatchInlineSnapshot(`
    Object {
      "valid": true,
    }
  `);

  const fnForInvalidValue = requiredToken('');
  expect(fnForInvalidValue()).toMatchInlineSnapshot(`
    Object {
      "message": "Token is required",
      "valid": false,
    }
  `);

  const fnForNilValue = requiredToken(null);
  expect(fnForNilValue()).toMatchInlineSnapshot(`
    Object {
      "message": "Token is required",
      "valid": false,
    }
  `);
});

test('requiredPassword', () => {
  const fnForValidValue = requiredPassword('mocked password');
  expect(fnForValidValue()).toMatchInlineSnapshot(`
    Object {
      "valid": true,
    }
  `);

  const fnForInvalidValue = requiredPassword('');
  expect(fnForInvalidValue()).toMatchInlineSnapshot(`
    Object {
      "message": "Enter at least 6 characters",
      "valid": false,
    }
  `);

  const fnForNilValue = requiredPassword(null);
  expect(fnForNilValue()).toMatchInlineSnapshot(`
    Object {
      "message": "Enter at least 6 characters",
      "valid": false,
    }
  `);
});

test('requiredConfirmedPassword', () => {
  const password = 'mocked password';
  const provideConfirmPass = requiredConfirmedPassword(password);

  const fnForMatchingPass = provideConfirmPass(password);
  expect(fnForMatchingPass()).toMatchInlineSnapshot(`
    Object {
      "valid": true,
    }
  `);

  const fnForMisMatchPass = provideConfirmPass('not matching password');
  expect(fnForMisMatchPass()).toMatchInlineSnapshot(`
    Object {
      "message": "Password does not match",
      "valid": false,
    }
  `);

  const fnForEmptyStrConfirmPass = provideConfirmPass('');
  expect(fnForEmptyStrConfirmPass()).toMatchInlineSnapshot(`
    Object {
      "message": "Please confirm your password",
      "valid": false,
    }
  `);

  const fnForNilConfirmPass = provideConfirmPass(null);
  expect(fnForNilConfirmPass()).toMatchInlineSnapshot(`
    Object {
      "message": "Please confirm your password",
      "valid": false,
    }
  `);

  // test with null values for both password and passwordConfirm
  const fnNilInitialPass = requiredConfirmedPassword(null);
  expect(fnNilInitialPass()(null)).toMatchInlineSnapshot(`
    Object {
      "message": "Please confirm your password",
      "valid": false,
    }
  `);

  // test with null password and string passwordConfirm
  expect(fnNilInitialPass()('')).toMatchInlineSnapshot(`
    Object {
      "message": "Please confirm your password",
      "valid": false,
    }
  `);
});
