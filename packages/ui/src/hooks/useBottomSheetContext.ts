import { useContext } from 'react';

import { BottomSheetContext } from '@/contexts/BottomSheetContext';

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useBottomSheetContext must be used within BottomSheet');
  }
  return context;
};
