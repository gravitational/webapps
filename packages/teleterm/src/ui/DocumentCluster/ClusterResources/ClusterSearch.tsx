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

import React from 'react';
import styled, { margin, padding, width, color, height } from 'design/styled';

import { debounce } from 'lodash';

export default function ClusterSearch(props: Props) {
  const ref = React.useRef<HTMLInputElement>();

  const handleOnChange = React.useMemo(() => {
    return debounce(() => {
      props.onChange(ref.current.value);
    }, 100);
  }, []);

  React.useEffect(() => {
    return () => handleOnChange.cancel();
  }, []);

  return <Input ref={ref} placeholder="Search..." onChange={handleOnChange} />;
}

const Input = styled.input([margin, padding, width, height, color])`
  background: ${p => p.theme.colors.primary.main};
  box-sizing: border-box;
  color: ${p => p.theme.colors.text.primary};
  width: 100%;
  min-height: 24px;
  min-width: 300px;
  outline: none;
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 2px 12px;

  &:hover, &:focus {
    color: ${p => p.theme.colors.primary.contrastText};
    border-color: ${p => p.theme.colors.primary.lighter};
    opacity: 1;
  }

  ::placeholder {
    opacity: 1;
    color: ${p => p.theme.colors.text.secondary};
  }
`;

type Props = {
  onChange(value: string): void;
};
