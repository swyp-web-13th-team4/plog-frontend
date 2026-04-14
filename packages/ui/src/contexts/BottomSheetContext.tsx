import { createContext } from 'react';

export type BottomSheetContextValue = {
  withHandle: boolean;
};

export const BottomSheetContext = createContext<
  BottomSheetContextValue | undefined
>(undefined);
