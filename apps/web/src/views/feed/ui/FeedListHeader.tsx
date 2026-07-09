'use client';

import { AppBar } from '@plog/ui';

export default function FeedListHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
      <AppBar variant="navigation" title="피드" />
    </header>
  );
}
