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
  show: (options: DialogOptions) => Promise<boolean>;
  close: (value: boolean) => void;
};

const DIALOG_CLOSE_DELAY_MS = 200;

export const useDialogStore = create<DialogState>((set, get) => ({
  open: false,
  options: null,
  resolve: null,
  show: (options) =>
    new Promise<boolean>((resolve) => {
      set({ open: true, options, resolve });
    }),
  close: (value) => {
    get().resolve?.(value);
    set({ open: false });
    setTimeout(() => {
      set({ options: null, resolve: null });
    }, DIALOG_CLOSE_DELAY_MS);
  },
}));
