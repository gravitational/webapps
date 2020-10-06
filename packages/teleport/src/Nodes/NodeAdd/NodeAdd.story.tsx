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

import React from 'react';
import Dialog from './NodeAddOptions';
import * as Teleport from 'teleport/teleportContext';
import makeAcl from 'teleport/services/user/makeAcl';

export default {
  title: 'Teleport/Nodes/Add',
};

export const Loaded = () => {
  const ctx = new Teleport.Context();
  const acl = makeAcl(sample.acl);
  ctx.storeUser.setState({ acl });

  return render(ctx, <Dialog {...sample.props} />);
};

export const Processing = () => {
  const ctx = new Teleport.Context();
  const acl = makeAcl(sample.acl);
  ctx.storeUser.setState({ acl });

  return render(
    ctx,
    <Dialog
      {...sample.props}
      token={null}
      getJoinToken={() => new Promise(() => null)}
    />
  );
};

export const Failed = () => {
  const ctx = new Teleport.Context();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.nodeService.getNodeJoinToken = () =>
    Promise.reject(new Error('some error message'));
  return render(
    ctx,
    <Dialog
      {...sample.props}
      token={null}
      getJoinToken={() => Promise.reject(new Error('some error message'))}
    />
  );
};

// Just render default (manually)
export const NoTokenPermission = () => {
  const ctx = new Teleport.Context();
  const acl = makeAcl(sample.acl);
  acl.tokens.create = false;
  ctx.storeUser.setState({ acl });

  return render(ctx, <Dialog {...sample.props} />);
};

function render(ctx: Teleport.Context, children: JSX.Element) {
  return (
    <Teleport.ReactContextProvider value={ctx}>
      {children}
    </Teleport.ReactContextProvider>
  );
}

const sample = {
  props: {
    token: {
      id: 'onokdisauhimefamacul',
      expires: '4h0m0s',
    },
    onClose() {
      return null;
    },
    getJoinToken() {
      return Promise.resolve(null);
    },
  },
  acl: {
    tokens: {
      create: true,
    },
  },
};
