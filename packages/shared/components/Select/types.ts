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

type GeneralProps = {
  hasError?: boolean;
  clearable?: boolean;
  isSimpleValue?: boolean;
  isSearchable?: boolean;
  maxMenuHeight?: number;
  onChange: (e: SelectOption) => void;
  value: null | SelectOption;
  // TS: temporary handles ...styles
  [key: string]: any;
};

export type SelectAsyncProps = GeneralProps & {
  defaultOptions?: true | SelectOption;
  cacheOptions?: boolean;
  defaultMenuIsOpen?: boolean;
  loadOptions: (
    input: string,
    o?: SelectOptionsList
  ) => Promise<SelectOptionsList | void>;
  noOptionsMessage: () => string;
};

export type SelectProps = GeneralProps & {
  isMulti?: boolean;
  autoFocus?: boolean;
  label?: string;
  placeholder?: string;
  options: SelectOptionsList;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectOptionsList = SelectOption[];
