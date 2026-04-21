import type { ReactNode } from 'react';

export type ToastType = 'default' | 'success' | 'error';

export type ToastData = {
  icon?: ReactNode;
};

export type ToastOptions =
  | { id?: string; type?: 'default'; icon?: ReactNode; description: string }
  | { id?: string; type: 'success'; description: string }
  | { id?: string; type: 'error'; description: string };
