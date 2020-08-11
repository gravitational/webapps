/*
Copyright 2020 Gravitational, Inc.

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

import { useEffect, useState, useAttempt } from 'shared/hooks';
import { useTeleport } from 'teleport/teleportContextProvider';
import { Resource } from 'teleport/services/resources';

export default function useTrustedClusters() {
  const teleContext = useTeleport();
  const [items, setItems] = useState<Resource[]>([]);
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const canCreate = teleContext.storeUser.getTrustedClusterAccess().create;

  function fetchData() {
    return teleContext.resourceService.fetchTrustedClusters().then(response => {
      setItems(response);
    });
  }

  function save(yaml: string, isNew: boolean) {
    return teleContext.resourceService
      .upsertTrustedCluster(yaml, isNew)
      .then(fetchData);
  }

  function remove(trustedCluster: Resource) {
    const { kind, name } = trustedCluster;
    return teleContext.resourceService.delete(kind, name).then(() => {
      setItems(items.filter(r => r.name !== name));
    });
  }

  useEffect(() => {
    attemptActions.do(() => fetchData());
  }, []);

  return {
    canCreate,
    items,
    save,
    remove,
    ...attempt,
  };
}
