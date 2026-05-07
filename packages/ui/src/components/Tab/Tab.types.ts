import { type ReactNode } from 'react';

export type TabIconProps =
  | { icon: ReactNode; activeIcon?: ReactNode }
  | { icon?: never; activeIcon?: never };

export type TabGroupItem = {
  value: string;
  disabled?: boolean;
  label: ReactNode;
  panel?: ReactNode;
  keepMounted?: boolean;
} & TabIconProps;
