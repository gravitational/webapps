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

import { useMemo } from 'react';
import AppContext from 'teleterm/ui/appContext';
import { useKeyboardShortcuts } from 'teleterm/ui/services/keyboardShortcuts';

export default function useTabHostShortcuts(ctx: AppContext) {
  const tabsShortcuts = useMemo(() => buildTabsShortcuts(ctx), [ctx]);
  useKeyboardShortcuts(tabsShortcuts);
}

function buildTabsShortcuts(ctx: AppContext) {
  const handle = (index: number) => () => {
    const docs = ctx.serviceDocs.getDocuments();
    if (docs[index]) {
      ctx.serviceDocs.open(docs[index].uri);
    }
  };

  return {
    'tab-1': handle(1),
    'tab-2': handle(2),
    'tab-3': handle(3),
    'tab-4': handle(4),
    'tab-5': handle(5),
    'tab-6': handle(6),
    'tab-7': handle(7),
    'tab-8': handle(8),
    'tab-9': handle(9),
  };
}
