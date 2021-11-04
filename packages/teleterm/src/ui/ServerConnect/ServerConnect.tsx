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
import Select, { Option, DarkStyledSelect } from 'shared/components/Select';
import { Text, ButtonSecondary } from 'design';
import Dialog, {
  DialogHeader,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import Validation from 'shared/components/Validation';
import useServerConnect, { State, Props } from './useServerConnect';

export default function Container(props: Props) {
  const state = useServerConnect(props);
  return <ServerConnect {...state} />;
}

export function ServerConnect(props: State) {
  const { server, logins, onClose, connect } = props;
  const loginOptions = logins.map(l => ({ value: l, label: l }));
  const handleOnChange = (option: Option) => {
    connect(option.value);
  };

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({
            maxWidth: '600px',
            width: '100%',
            padding: '20px',
          })}
          disableEscapeKeyDown={false}
          onClose={onClose}
          open={true}
        >
          <DialogHeader>
            <Text typography="h3" color="text.primary">
              Connect to <b>{server.name}</b>
            </Text>
          </DialogHeader>
          <DialogContent>
            <DarkStyledSelect width="210px">
              <Select
                isSearchable={false}
                options={loginOptions}
                onChange={handleOnChange}
                value={loginOptions[0]}
              />
            </DarkStyledSelect>
          </DialogContent>
          <DialogFooter>
            <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
          </DialogFooter>
        </Dialog>
      )}
    </Validation>
  );
}
