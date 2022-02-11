import { VirtualScrollItem, VirtualScrollProps } from './types';

export function prepareVirtualScrollItems<T>(
  options: Pick<VirtualScrollProps<T>, 'items' | 'keyProp' | 'childrenProp'> & {
    expandedKeys: Set<unknown>;
  }
) {
  function getFlattenedItems(
    items: T[],
    parentKeys: string[] = []
  ): VirtualScrollItem<T>[] {
    return items.reduce<VirtualScrollItem<T>[]>((flattenedItems, item) => {
      const hasChildren = item =>
        Array.isArray(item[options.childrenProp]) &&
        item[options.childrenProp]?.length;
      const isLeaf = !hasChildren(item);
      const deepLevel = parentKeys.length;
      const virtualScrollItem = { item, deepLevel, parentKeys, isLeaf };

      if (isLeaf || !options.expandedKeys.has(item[options.keyProp])) {
        return [...flattenedItems, virtualScrollItem];
      }

      return [
        ...flattenedItems,
        virtualScrollItem,
        ...getFlattenedItems(item[options.childrenProp] as unknown as T[], [
          ...parentKeys,
          item[options.keyProp] as unknown as string,
        ]),
      ];
    }, []);
  }

  return getFlattenedItems(options.items);
}
