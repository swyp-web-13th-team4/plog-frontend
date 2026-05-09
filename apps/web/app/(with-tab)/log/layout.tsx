'use client';

import { ReactNode, useCallback, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { AppBar } from '@plog/ui';

import { LogBackProvider } from '@/views/log/model/log-back-context';

import { hasCreateLogValues, useCreateLogStore } from '@/features/create-log';

import { dialog } from '@/shared/lib/dialog';

export default function CreateFeedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const editPostId = searchParams.get('postId');
  const logBackHandlerRef = useRef<(() => void | Promise<void>) | null>(null);
  const registerLogBackHandler = useCallback(
    (handler: (() => void | Promise<void>) | null) => {
      logBackHandlerRef.current = handler;
    },
    [],
  );
  const createLogValues = useCreateLogStore((state) => state.values);
  const hasPhotos = useCreateLogStore((state) => state.hasPhotos);
  const resetCreateLog = useCreateLogStore((state) => state.reset);

  const isPlaceSearchPage = pathname.startsWith('/log/place-search');
  const isEditLogPage = Boolean(editPostId) && !isPlaceSearchPage;
  const hasCreateLogData = hasCreateLogValues(createLogValues) || hasPhotos;

  const handleBack = async () => {
    if (isPlaceSearchPage) {
      router.push('/log');
      return;
    }

    if (isEditLogPage) {
      const handler = logBackHandlerRef.current;
      if (handler) {
        await handler();
        return;
      }
      if (editPostId) {
        router.push(`/feed/${editPostId}`);
      }
      return;
    }

    if (!hasCreateLogData) {
      router.push('/map');
      return;
    }

    const confirmed = await dialog.confirm({
      message: '작성을 중단하시겠어요?',
      description: '작성 중인 기록은 저장되지 않고 사라져요.',
      confirmLabel: '확인',
      cancelLabel: '취소',
    });

    if (!confirmed) return;

    resetCreateLog();
    router.push('/map');
  };

  return (
    <LogBackProvider registerHandler={registerLogBackHandler}>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title={isPlaceSearchPage ? '장소 검색' : '환경 기록'}
          onBack={handleBack}
        />
      </header>
      <div className="pt-[var(--spacing-header)]">{children}</div>
    </LogBackProvider>
  );
}
