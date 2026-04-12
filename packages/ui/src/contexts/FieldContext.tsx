import { createContext } from 'react';

export type CharCountInfo = { count: number; max: number };

export type FieldContextValue = {
  insideField: boolean;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
  onCharCountChange?: (info: CharCountInfo | null) => void;
};

export const FieldContext = createContext<FieldContextValue>({
  insideField: false,
  invalid: false,
  disabled: false,
  required: false,
});
