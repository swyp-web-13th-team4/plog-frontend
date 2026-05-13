import { useCallback, useEffect, useRef, useState } from 'react';

type FocusTarget = 'primary' | 'secondary';

type FeedbackTarget = {
  id: number;
  focusTarget: FocusTarget;
};

export function useScrollFocusTarget<
  TField extends HTMLElement,
  TFocus extends HTMLElement,
>() {
  const fieldElementRef = useRef<TField | null>(null);
  const primaryFocusElementRef = useRef<TFocus | null>(null);
  const secondaryFocusElementRef = useRef<TFocus | null>(null);
  const [target, setTarget] = useState<FeedbackTarget | null>(null);

  const fieldRef = useCallback((element: TField | null) => {
    fieldElementRef.current = element;
  }, []);

  const focusRef = useCallback((element: TFocus | null) => {
    primaryFocusElementRef.current = element;
  }, []);

  const secondaryFocusRef = useCallback((element: TFocus | null) => {
    secondaryFocusElementRef.current = element;
  }, []);

  const trigger = useCallback((focusTarget: FocusTarget = 'primary') => {
    setTarget((currentTarget) => ({
      id: (currentTarget?.id ?? 0) + 1,
      focusTarget,
    }));
  }, []);

  useEffect(() => {
    if (!target) return;

    fieldElementRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    const timeoutId = window.setTimeout(() => {
      const focusElement =
        target.focusTarget === 'primary'
          ? primaryFocusElementRef.current
          : secondaryFocusElementRef.current;

      focusElement?.focus({ preventScroll: true });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [target]);

  return { fieldRef, focusRef, secondaryFocusRef, trigger };
}
