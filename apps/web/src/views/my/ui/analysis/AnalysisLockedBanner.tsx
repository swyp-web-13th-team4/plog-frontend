import Link from 'next/link';

import { Button } from '@plog/ui';

type AnalysisLockedBannerProps = {
  variant: 'full' | 'partial';
};

function WriteButton() {
  return (
    <Button
      variant="outline"
      size="small"
      nativeButton={false}
      render={<Link href="/log" />}
    >
      기록 작성하기
    </Button>
  );
}

export default function AnalysisLockedBanner({
  variant,
}: AnalysisLockedBannerProps) {
  if (variant === 'full') {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div>
          <p className="title-md text-semantic-object-boldest">
            기록이 쌓이면 나만의
          </p>
          <p className="title-md">
            집중{' '}
            <span className="text-semantic-accent-normal">
              환경 분석 리포트
            </span>
            <span className="text-semantic-object-boldest">가 열려요</span>
          </p>
        </div>
        <p className="caption-md mt-2.5 mb-5 text-semantic-object-normal">
          기록이 쌓이면 나에게 맞는 분석 리포트를 완성할 수 있어요.
        </p>
        <WriteButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div>
        <p className="title-md text-semantic-object-boldest">
          기록이 15개 이상 쌓이면 나만의
        </p>
        <p className="title-md">
          <span className="text-semantic-accent-normal">환경 분석 리포트</span>
          <span className="text-semantic-object-boldest">
            가 모두 공개돼요.
          </span>
        </p>
      </div>
      <p className="caption-md mt-2.5 mb-5 text-semantic-object-normal">
        기록이 모일수록 리포트는 더 정확해져요.
        <br />
        지금 바로 다음 기록을 시작해 볼까요?
      </p>
      <WriteButton />
    </div>
  );
}
