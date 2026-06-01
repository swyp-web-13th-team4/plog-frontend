'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Button, EmptyState } from '@plog/ui';
import * as Sentry from '@sentry/nextjs';

import ErrorGraphic from '@/shared/assets/empty-graphics/error.svg';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex h-dvh items-center">
      <EmptyState
        graphic={<ErrorGraphic />}
        title="서비스에 접속할 수 없습니다."
        description={
          '지금 이 서비스와 연결할 수 없습니다.\n문제를 해결하기 위해 노력하고 있습니다.\n잠시 후 다시 확인해 주세요.'
        }
        actions={
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="small"
              onClick={() => router.replace('/')}
            >
              메인 화면으로 이동
            </Button>
            <Button variant="outline" size="small" onClick={reset}>
              다시 시도하기
            </Button>
          </div>
        }
        className="flex-1 justify-center py-12"
      />
    </div>
  );
}
