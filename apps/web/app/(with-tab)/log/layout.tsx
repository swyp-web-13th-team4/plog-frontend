'use client';

import { ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';

import {
  hasCreateLogValues,
  useCreateLogStore,
} from '@/views/log/model/use-create-log-store';

import { dialog } from '@/shared/lib/dialog';

export default function CreateFeedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const createLogValues = useCreateLogStore((state) => state.values);
  const hasPhotos = useCreateLogStore((state) => state.hasPhotos);
  const resetCreateLog = useCreateLogStore((state) => state.reset);

  const isPlaceSearchPage = pathname.startsWith('/log/place-search');
  const hasCreateLogData = hasCreateLogValues(createLogValues) || hasPhotos;

  const handleBack = async () => {
    if (isPlaceSearchPage) {
      router.push('/log');
      return;
    }

    if (!hasCreateLogData) {
      router.push('/map');
      return;
    }

    const confirmed = await dialog.confirm({
      message: '작성 중인 기록을 그만둘까요?',
      description: '나가면 작성 중인 내용이 삭제돼요.',
      confirmLabel: '나가기',
      cancelLabel: '계속 작성',
    });

    if (!confirmed) return;

    resetCreateLog();
    router.push('/map');
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title={isPlaceSearchPage ? '장소 검색' : '환경 기록'}
          onBack={handleBack}
        />
      </header>
      <div className="pt-[var(--spacing-header)]">{children}</div>
    </>
  );
}
