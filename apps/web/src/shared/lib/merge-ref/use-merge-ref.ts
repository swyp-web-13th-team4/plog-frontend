import { type Ref, useCallback } from 'react';

export function assignRef<TElement>(
  ref: Ref<TElement> | undefined,
  value: TElement | null,
) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
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
      assignRef(refA, element);
      assignRef(refB, element);
    },
    [refA, refB],
  );
}
