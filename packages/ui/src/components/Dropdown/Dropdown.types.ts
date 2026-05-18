import { type ReactNode } from 'react';

export type DropdownItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type DropdownProps = {
  items: DropdownItem[];
  trigger: ReactNode;
  onSelect: (value: string) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  positionerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
} & (
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
);
