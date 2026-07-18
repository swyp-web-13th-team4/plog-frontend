'use client';

import { type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';

interface NavigationHeaderProps {
  title: string;
  onBack?: (() => void) | null;
  backTo?: string;
  actions?: ReactNode;
}

export default function NavigationHeader({
  title,
  onBack,
  backTo,
  actions,
}: NavigationHeaderProps) {
  const router = useRouter();

  const handleBack =
    onBack === null
      ? undefined
      : (onBack ?? (backTo ? () => router.push(backTo) : () => router.back()));

  return (
    <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
      <AppBar
        variant="navigation"
        title={title}
        onBack={handleBack}
        actions={actions}
      />
    </header>
  );
}
