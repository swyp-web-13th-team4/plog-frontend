'use client';

import { useRouter } from 'next/navigation';

import { Button, EmptyState } from '@plog/ui';

import NotFoundGraphic from '@/shared/assets/empty-graphics/not-found.svg';

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <div className="flex h-dvh items-center">
      <EmptyState
        graphic={<NotFoundGraphic />}
        title="페이지를 찾을 수 없습니다."
        description={
          '입력하신 주소의 페이지를 찾을 수 없습니다.\n삭제되었거나 다른 주소로 변경되었을 수 있습니다.\n주소를 다시 확인해 주세요.'
        }
        actions={
          <div className="flex gap-3">
            <Button variant="outline" size="small" onClick={handleBack}>
              이전 화면으로 이동
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => router.replace('/')}
            >
              메인 화면으로 이동
            </Button>
          </div>
        }
        className="flex-1 justify-center py-12"
      />
    </div>
  );
}
