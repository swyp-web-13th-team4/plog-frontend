import { useCallback, useEffect, useRef, useState } from 'react';

type FeedbackTarget = {
  focusIndex: number;
  id: number;
};

export function useScrollFocusTarget<
  TField extends HTMLElement,
  TFocus extends HTMLElement,
>() {
  const fieldElementRef = useRef<TField | null>(null);
  const focusElementRefs = useRef<Array<TFocus | null>>([]);
  const [target, setTarget] = useState<FeedbackTarget | null>(null);

  const fieldRef = useCallback((element: TField | null) => {
    fieldElementRef.current = element;
  }, []);

  const focusRef = useCallback((element: TFocus | null) => {
    focusElementRefs.current[0] = element;
  }, []);

  const getFocusRef = useCallback(
    (focusIndex = 0) =>
      (element: TFocus | null) => {
        focusElementRefs.current[focusIndex] = element;
      },
    [],
  );

  const trigger = useCallback((focusIndex = 0) => {
    setTarget((currentTarget) => ({
      focusIndex,
      id: (currentTarget?.id ?? 0) + 1,
    }));
  }, []);

  useEffect(() => {
    if (!target) return;

    fieldElementRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    const timeoutId = window.setTimeout(() => {
      focusElementRefs.current[target.focusIndex]?.focus({
        preventScroll: true,
      });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [target]);

  return { fieldRef, focusRef, getFocusRef, trigger };
}
