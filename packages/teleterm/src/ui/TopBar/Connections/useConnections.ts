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

import { useAppContext } from 'teleterm/ui/appContextProvider';
import { useCallback, useMemo, useState } from 'react';

export function useConnections() {
  const { connectionTracker } = useAppContext();

  connectionTracker.useState();

  const items = connectionTracker.getConnections();
  const [sortedIds, setSortedIds] = useState<string[]>([]);
  const sortedItems = useMemo(
    () =>
      sortedIds.map(id => items.find(item => item.id === id)).filter(Boolean),
    [items, sortedIds]
  );

  const updateSorting = useCallback(() => {
    const sorted = [...items]
      // new items are pushed to the list in connection tracker
      // sow we have to reverse them to get the newest on the top
      .reverse()
      // connected first
      .sort((a, b) => (a.connected === b.connected ? 0 : a.connected ? -1 : 1))
      .map(a => a.id);

    setSortedIds(sorted);
  }, [setSortedIds, items]);

  return {
    isAnyConnectionActive: sortedItems.some(c => c.connected),
    removeItem: (id: string) => connectionTracker.removeItem(id),
    activateItem: (id: string) => connectionTracker.activateItem(id),
    disconnectItem: (id: string) => connectionTracker.disconnectItem(id),
    updateSorting,
    items: sortedItems,
  };
}
