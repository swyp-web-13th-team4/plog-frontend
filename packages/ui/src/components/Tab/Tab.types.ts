import { type ReactNode } from 'react';

export type TabGroupItem = {
  value: string;
  disabled?: boolean;
  label: ReactNode;
  icon?: ReactNode;
  panel?: ReactNode;
  keepMounted?: boolean;
};
