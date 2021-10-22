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

import { useEffect } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import useAsync from 'teleterm/ui/useAsync';

export default function useGatewayCreate({ targetUri, onClose }: Props) {
  const ctx = useAppContext();
  const db = ctx.serviceClusters.findDb(targetUri);
  const [createAttempt, create] = useAsync((port: string) => {
    return ctx.serviceClusters.createGateway(targetUri, port);
  });

  useEffect(() => {
    if (createAttempt.status === 'success') {
      ctx.serviceDocs.open(createAttempt.data.uri);
      onClose();
    }
  }, [createAttempt.status]);

  return {
    createAttempt,
    create,
    db,
    onClose,
  };
}

export type Props = {
  onClose(): void;
  targetUri: string;
};

export type State = ReturnType<typeof useGatewayCreate>;
