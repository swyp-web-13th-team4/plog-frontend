import { type ReactNode } from 'react';

import { create } from 'zustand';

export type DialogType = 'alert' | 'confirm';

export type DialogOptions = {
  type: DialogType;
  graphic?: ReactNode;
  message: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

type DialogState = {
  open: boolean;
  options: DialogOptions | null;
  resolve: ((value: boolean) => void) | null;
  clearTimer: ReturnType<typeof setTimeout> | null;
  show: (options: DialogOptions) => Promise<boolean>;
  close: (value: boolean) => void;
};

const DIALOG_CLOSE_DELAY_MS = 200;

export const useDialogStore = create<DialogState>((set, get) => ({
  open: false,
  options: null,
  resolve: null,
  clearTimer: null,
  show: (options) =>
    new Promise<boolean>((resolve) => {
      const { clearTimer, resolve: prevResolve } = get();
      if (clearTimer) clearTimeout(clearTimer);
      prevResolve?.(false);
      set({ open: true, options, resolve, clearTimer: null });
    }),
  close: (value) => {
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
}));
