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

import Validator from './Validation';
import Logger from '../../libs/logger';

jest.mock('../../libs/logger', () => {
  return {
    create: jest.fn(() => ({ error: jest.fn() })),
  };
});

test('validation class methods', () => {
  const mockCb1 = jest.fn();
  const mockCb2 = jest.fn();
  const validator = new Validator();

  // test correct constructor initiation
  expect(validator.valid).toEqual(true);
  expect(validator._subs).toEqual([]);

  // test suscribe method correctly pushes cb into array
  validator.subscribe(mockCb1);
  validator.subscribe(mockCb2);
  expect(validator._subs).toHaveLength(2);

  // test unsubscribe method removes correct cb
  validator.unsubscribe(mockCb2);
  expect(validator._subs).toHaveLength(1);
  expect(validator._subs.indexOf(mockCb1)).toBe(0);

  // test addResult for nil object
  const result = null;
  validator.addResult(result);
  expect(Logger.create).toHaveBeenCalledTimes(1);

  // test addResult for boolean
  validator.addResult(true);
  expect(validator.valid).toBe(false);

  // test addResult with incorrect object
  let resultObj = {};
  validator.addResult(resultObj);
  expect(validator.valid).toBe(false);

  // test addResult with correct object with "valid" prop from prior test set to false
  resultObj = { valid: true };
  validator.addResult(resultObj);
  expect(validator.valid).toBe(false);

  // test reset
  validator.reset();
  expect(validator.valid).toBe(true);
  expect(validator.validating).toBe(false);

  // test addResult with correct object with "valid" prop reset to true
  validator.addResult(resultObj);
  expect(validator.valid).toBe(true);

  // test validate
  expect(validator.validate()).toEqual(true);
  expect(mockCb1).toHaveBeenCalledTimes(1);
});
