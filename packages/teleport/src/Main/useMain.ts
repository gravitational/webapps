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

import React from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import TeleportContext from 'teleport/teleportContext';
import { Feature } from 'teleport/types';

export default function useMainState(features: Feature[]) {
  const { attempt, run } = useAttempt('processing');
  const [ctx] = React.useState(() => {
    return new TeleportContext();
  });

  React.useState(() => {
    run(() => {
      // initialize teleport context with features
      return ctx.init().then(() => features.forEach(f => f.register(ctx)));
    });
  });

  return {
    ctx,
    status: attempt.status,
    statusText: attempt.statusText,
  };
}
