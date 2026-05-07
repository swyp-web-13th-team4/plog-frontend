import { useState } from 'react';

import { type FeedViewType } from './types';

export function useFeedViewType() {
  const [viewType, setViewType] = useState<FeedViewType>('list');

  const toggleViewType = () => {
    setViewType((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  return { viewType, toggleViewType };
}
