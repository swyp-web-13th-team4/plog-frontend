'use client';

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { AppBar, Button, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import type { TypeCardTheme } from '@/entities/user';
import { useAnalyticsQuery, useMypageQuery } from '@/entities/user';
import { TYPE_CARDS } from '@/entities/user';

import CoachMark from '../ui/CoachMark';
import TypeCard from '../ui/TypeCard';

type View = 'my' | 'all';

const themeTextClass: Record<TypeCardTheme, string> = {
  green: 'text-semantic-feedback-success-normal',
  yellow: 'text-semantic-theme-yellow-bold',
  pink: 'text-semantic-feedback-error-alternative',
  sky: 'text-semantic-theme-sky-normal',
  navy: 'text-semantic-feedback-info-bold',
  purple: 'text-semantic-theme-purple-normal',
};

function PageLayout({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title={title} onBack={onBack} />
      </header>
      <div className="flex min-h-[calc(100dvh-var(--spacing-bottom-tab))] flex-col items-center justify-center gap-10 p-6 pt-[calc(24px+var(--spacing-header))] mobile:gap-5">
        {children}
      </div>
    </>
  );
}

function NavigationButton({
  className,
  disabled,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={cn(
        'flex size-12 cursor-pointer items-center justify-center rounded-full bg-semantic-bg-deeper transition-opacity disabled:cursor-not-allowed',
        disabled && 'opacity-30',
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}

export default function TypeCardsPage() {
  const [view, setView] = useState<View>('my');
  const [showCoachMark, setShowCoachMark] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const { data: mypage } = useMypageQuery();
  const { data: analytics } = useAnalyticsQuery();

  useEffect(() => {
    if (analytics?.workType === null) {
      router.replace('/my');
    }
  }, [analytics, router]);

  if (!analytics || analytics.workType === null) return null;

  const userTypeId = analytics?.workType ?? null;
  const userCard = userTypeId
    ? TYPE_CARDS.find((c) => c.id === userTypeId)
    : null;
  const currentCard = TYPE_CARDS[currentIndex];

  const handleShowAll = () => {
    setCurrentIndex(0);
    setView('all');
  };

  if (view === 'my') {
    return (
      <>
        <PageLayout title="내 유형 카드" onBack={() => router.back()}>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="title-md text-semantic-object-bold mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
              <span className="title-lg text-semantic-object-boldest mobile:text-semantic-title-sm mobile:leading-semantic-title-sm mobile:font-semantic-title-sm">
                {`${mypage?.nickname ?? ''} `}
              </span>
              님의 작업 유형은
            </p>
            <h2
              className={cn(
                'hero-md mobile:text-semantic-title-lg mobile:leading-semantic-title-lg mobile:font-semantic-title-lg',
                userCard ? themeTextClass[userCard.theme] : '',
              )}
            >
              {userCard?.fullName ?? ''}
            </h2>
          </div>
          {userTypeId && <TypeCard id={userTypeId} />}
          <Button
            variant="primary"
            size="large"
            onClick={handleShowAll}
            className="w-full max-w-90"
          >
            모든 유형 보러가기
          </Button>
        </PageLayout>
        {showCoachMark && <CoachMark onClick={() => setShowCoachMark(false)} />}
      </>
    );
  }

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < TYPE_CARDS.length - 1;

  return (
    <PageLayout title="모든 유형 보기" onBack={() => setView('my')}>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="title-md text-semantic-object-bold mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
          유형은 총 6개로 구성되어 있어요
        </p>
        <h2
          className={cn(
            'hero-md mobile:text-semantic-title-lg mobile:leading-semantic-title-lg mobile:font-semantic-title-lg',
            themeTextClass[currentCard.theme],
          )}
        >
          {currentCard.fullName}
        </h2>
      </div>
      <TypeCard key={currentCard.id} id={currentCard.id} />
      <div className="flex w-full max-w-90 items-center justify-between">
        <NavigationButton
          disabled={!canPrev}
          onClick={() => setCurrentIndex((i) => i - 1)}
          aria-label="이전 유형"
        >
          <Icon
            name="chevron-left-thick"
            size={24}
            className="text-semantic-object-bold"
          />
        </NavigationButton>
        <div className="flex items-center gap-3">
          {TYPE_CARDS.map((_, i) => (
            <button
              key={i}
              aria-label={`슬라이드 ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              className={cn(
                'rounded-full transition-all duration-200',
                i === currentIndex
                  ? 'size-3 bg-semantic-accent-neutral'
                  : 'size-2.5 bg-semantic-object-subtler',
              )}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
        <NavigationButton
          disabled={!canNext}
          onClick={() => setCurrentIndex((i) => i + 1)}
          aria-label="다음 유형"
        >
          <Icon
            name="chevron-right-thick"
            size={24}
            className="text-semantic-object-bold"
          />
        </NavigationButton>
      </div>
    </PageLayout>
  );
}
