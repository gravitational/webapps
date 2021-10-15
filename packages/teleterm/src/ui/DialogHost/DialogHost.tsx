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
import { useCmdStore } from './../appContextProvider';
import AddCluster from './../AddCluster';

export default function DialogHost() {
  const store = useCmdStore();
  if (store.state.kind === 'dialog.addCluster.open') {
    return (
      <AddCluster
        onClose={() => store.setCommand({ kind: 'dialog.addCluster.close' })}
      />
    );
  }

  return null;
}
