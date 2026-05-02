import { type ReactNode } from 'react';

import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type DialogType = 'alert' | 'confirm';

export type DialogOptions = {
  type: DialogType;
  graphic?: ReactNode;
  message: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const DIALOG_CLOSE_DELAY_MS = 200;

const initialState = {
  open: false,
  options: null as DialogOptions | null,
  resolve: null as ((value: boolean) => void) | null,
  clearTimer: null as ReturnType<typeof setTimeout> | null,
};

export const useDialogStore = create(
  combine(initialState, (set, get) => ({
    show: (options: DialogOptions) =>
      new Promise<boolean>((resolve) => {
        const { clearTimer, resolve: prevResolve } = get();
        if (clearTimer) clearTimeout(clearTimer);
        prevResolve?.(false);
        set({ open: true, options, resolve, clearTimer: null });
      }),
    close: (value: boolean) => {
      const { resolve, clearTimer } = get();
      resolve?.(value);
      if (clearTimer) clearTimeout(clearTimer);

      const timer = setTimeout(() => {
        if (!get().open) {
          set({ options: null, resolve: null, clearTimer: null });
        }
      }, DIALOG_CLOSE_DELAY_MS);

      set({ open: false, resolve: null, clearTimer: timer });
    },
  })),
);
