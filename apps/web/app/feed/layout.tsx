'use client';

import { ReactNode } from 'react';

import { AppBar } from '@plog/ui';

type FeedLayoutProps = {
  children: ReactNode;
};
export default function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <div>
      <AppBar variant="navigation" title="피드" />
      {children}
    </div>
  );
}
