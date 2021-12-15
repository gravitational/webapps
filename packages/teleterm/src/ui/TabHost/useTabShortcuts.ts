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
import {
  KeyboardShortcutHandlers,
  useKeyboardShortcuts,
} from 'teleterm/ui/services/keyboardShortcuts';

export default function useTabHostShortcuts(
  ctx: AppContext,
  { openNewTab }: { openNewTab(): void }
) {
  const tabsShortcuts = useMemo(
    () => buildTabsShortcuts(ctx, { openNewTab }),
    [ctx, openNewTab]
  );
  useKeyboardShortcuts(tabsShortcuts);
}

function buildTabsShortcuts(
  ctx: AppContext,
  { openNewTab }: { openNewTab(): void }
): KeyboardShortcutHandlers {
  const handleTabIndex = (index: number) => () => {
    const docs = ctx.serviceDocs.getDocuments();
    if (docs[index]) {
      ctx.serviceDocs.open(docs[index].uri);
    }
  };

  const handleActiveTabClose = () => {
    const activeDoc = ctx.serviceDocs.getActive();
    if (activeDoc.kind !== 'blank') {
      ctx.serviceDocs.close({ uri: activeDoc.uri });
    }
  };

  const handleTabSwitch = (direction: 'previous' | 'next') => () => {
    const activeDoc = ctx.serviceDocs.getActive();
    const allDocuments = ctx.serviceDocs
      .getDocuments()
      .filter(d => d.kind !== 'blank');
    const activeDocIndex = allDocuments.indexOf(activeDoc);
    const getPreviousIndex = () =>
      (activeDocIndex - 1 + allDocuments.length) % allDocuments.length;
    const getNextIndex = () => (activeDocIndex + 1) % allDocuments.length;
    const indexToOpen =
      direction === 'previous' ? getPreviousIndex() : getNextIndex();

    ctx.serviceDocs.open(allDocuments[indexToOpen].uri);
  };
  return {
    'tab-1': handleTabIndex(1),
    'tab-2': handleTabIndex(2),
    'tab-3': handleTabIndex(3),
    'tab-4': handleTabIndex(4),
    'tab-5': handleTabIndex(5),
    'tab-6': handleTabIndex(6),
    'tab-7': handleTabIndex(7),
    'tab-8': handleTabIndex(8),
    'tab-9': handleTabIndex(9),
    'tab-close': handleActiveTabClose,
    'tab-previous': handleTabSwitch('previous'),
    'tab-next': handleTabSwitch('next'),
    'tab-new': openNewTab,
  };
}
