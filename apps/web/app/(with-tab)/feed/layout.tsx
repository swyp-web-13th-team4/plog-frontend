'use client';

import { ReactNode } from 'react';

import { AppBar } from '@plog/ui';

type FeedLayoutProps = {
  children: ReactNode;
};
export default function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title="피드" />
      </header>
      <div className="pt-[var(--spacing-header)]">{children}</div>
    </>
  );
}
