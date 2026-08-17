import { type Ref, useCallback } from 'react';

export function assignRef<TElement>(
  ref: Ref<TElement> | undefined,
  value: TElement | null,
): void | (() => void) {
  if (!ref) return;
  if (typeof ref === 'function') {
    return ref(value);
  } else {
    ref.current = value;
  }
}

export function useMergedRef<TElement>(
  refA: Ref<TElement> | undefined,
  refB: Ref<TElement> | undefined,
) {
  return useCallback(
    (element: TElement | null) => {
      const cleanupA = assignRef(refA, element);
      const cleanupB = assignRef(refB, element);

      if (typeof cleanupA !== 'function' && typeof cleanupB !== 'function') {
        return;
      }

      return () => {
        if (typeof cleanupA === 'function') cleanupA();
        else assignRef(refA, null);

        if (typeof cleanupB === 'function') cleanupB();
        else assignRef(refB, null);
      };
    },
    [refA, refB],
  );
}
