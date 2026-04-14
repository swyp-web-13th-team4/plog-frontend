import { useContext } from 'react';

import { BottomSheetContext } from '@/contexts/BottomSheetContext';

export const useBottomSheetContext = () => useContext(BottomSheetContext);
