/*
Copyright 2021 Gravitational, Inc.

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

import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import { JoinToken } from 'teleport/services/jointoken';

export default function useAddDatabase(ctx: Ctx) {
  const defaultJoinToken = { id: '', expiry: new Date() };
  const [joinToken, setJoinToken] = useState<JoinToken>(defaultJoinToken);
  const { attempt, run, setAttempt } = useAttempt('processing');
  const canCreate = ctx.storeUser.getTokenAccess().create;

  useEffect(() => {
    if (canCreate) {
      run(() =>
        ctx.joinTokenService.generateJoinToken(['Db']).then(setJoinToken)
      );
    } else {
      setAttempt({ status: 'failed' });
    }
  }, [canCreate]);

  return {
    joinToken,
    attempt,
  };
}
