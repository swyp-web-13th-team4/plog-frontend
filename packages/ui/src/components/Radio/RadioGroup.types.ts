import { type ReactNode } from 'react';

export type RadioGroupOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};
