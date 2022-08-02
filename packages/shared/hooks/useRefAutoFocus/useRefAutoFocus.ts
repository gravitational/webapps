import { DependencyList, MutableRefObject, useEffect, useRef } from 'react';

/**
 * Returns `ref` object that is automatically focused when `canFocus` is `true`.
 * Focus can be also re triggered by changing any of the `refocusDeps`.
 */
export function useRefAutoFocus<T extends { focus(): void }>(options: {
  canFocus: boolean;
  refocusDeps?: DependencyList;
}): MutableRefObject<T> {
  const ref = useRef<T>();

  useEffect(() => {
    if (options.canFocus) {
      ref.current?.focus();
    }
  }, [options.canFocus, ref, ...(options.refocusDeps || [])]);

  return ref;
}
