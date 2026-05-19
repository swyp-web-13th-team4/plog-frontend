'use client';

import { useRef, useState } from 'react';

import { Button, Dialog, Icon, Spinner, useToast } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatDate } from '@/entities/feed';
import { useMypageQuery, type UserBadge } from '@/entities/user';

import { FetchErrorEmptyState } from '@/shared/ui';

import {
  useSetMainBadgeMutation,
  useUnsetMainBadgeMutation,
} from '../model/use-main-badge-mutation';
import { useMyBadgesQuery } from '../model/use-my-badges-query';

export default function BadgeTab() {
  const { data: badges = [], isPending, isError, refetch } = useMyBadgesQuery();
  const { data: mypage } = useMypageQuery();
  const { mutate: setMainBadge, isPending: isSetting } =
    useSetMainBadgeMutation();
  const { mutate: unsetMainBadge, isPending: isUnsetting } =
    useUnsetMainBadgeMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<UserBadge | null>(null);

  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { toast } = useToast();

  const mainBadge = mypage?.mainBadge ?? null;

  const openBadgeDialog = (badge: UserBadge) => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    setSelectedBadge(badge);
    setDialogOpen(true);
  };

  const closeBadgeDialog = () => {
    setDialogOpen(false);
    clearTimerRef.current = setTimeout(() => setSelectedBadge(null), 200);
  };

  const handleSetMainBadge = () => {
    if (!selectedBadge) return;
    setMainBadge(selectedBadge.id, {
      onSuccess: () => {
        closeBadgeDialog();
        toast({
          type: 'success',
          description: '대표 배지를 설정했어요.',
        });
      },
    });
  };

  const handleUnsetMainBadge = () => {
    unsetMainBadge(undefined, {
      onSuccess: () => {
        closeBadgeDialog();
        toast({
          type: 'success',
          description: '대표 배지를 해제했어요.',
        });
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <FetchErrorEmptyState onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col gap-12 px-6 py-8">
        <MainBadgeSection mainBadge={mainBadge} />
        <BadgeGrid
          badges={badges}
          mainBadgeId={mainBadge?.id ?? null}
          onBadgeClick={openBadgeDialog}
        />
      </div>
      <BadgeDetailDialog
        open={dialogOpen}
        badge={selectedBadge}
        isMain={mainBadge?.id === selectedBadge?.id}
        isSetting={isSetting}
        isUnsetting={isUnsetting}
        onClose={closeBadgeDialog}
        onSetMain={handleSetMainBadge}
        onUnsetMain={handleUnsetMainBadge}
      />
    </>
  );
}

type MainBadgeSectionProps = {
  mainBadge: UserBadge | null;
};

function MainBadgeSection({ mainBadge }: MainBadgeSectionProps) {
  return (
    <section className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h2 className="title-xs text-semantic-object-boldest">
          나의 대표 배지
        </h2>
        {!mainBadge && (
          <p className="body-sm text-semantic-object-normal">
            아직 설정한 대표 배지가 없어요.
          </p>
        )}
      </div>
      <div
        className={cn(
          'flex size-36 items-center justify-center overflow-hidden rounded-2xl bg-semantic-bg-deeper',
          mainBadge &&
            'border border-semantic-accent-normal bg-semantic-accent-subtler',
        )}
      >
        {mainBadge ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainBadge.imageUrl}
            alt={mainBadge.name}
            className="size-full object-contain"
          />
        ) : (
          <Icon
            name="lock-filled"
            size={56}
            className="text-semantic-object-subtle"
          />
        )}
      </div>
    </section>
  );
}

type BadgeGridProps = {
  badges: UserBadge[];
  mainBadgeId: number | null;
  onBadgeClick: (badge: UserBadge) => void;
};

function BadgeGrid({ badges, mainBadgeId, onBadgeClick }: BadgeGridProps) {
  return (
    <section>
      <ul className="grid grid-cols-3 gap-x-6 gap-y-4">
        {badges.map((badge) => (
          <BadgeItem
            key={badge.id}
            badge={badge}
            isMain={mainBadgeId === badge.id}
            onClick={badge.isAcquired ? () => onBadgeClick(badge) : undefined}
          />
        ))}
      </ul>
    </section>
  );
}

type BadgeItemProps = {
  badge: UserBadge;
  isMain: boolean;
  onClick?: () => void;
};

function BadgeItem({ badge, isMain, onClick }: BadgeItemProps) {
  return (
    <li className="flex flex-col items-center gap-2.5">
      <button
        type="button"
        disabled={!badge.isAcquired}
        onClick={onClick}
        aria-label={
          badge.isAcquired
            ? `${badge.name} 대표 배지로 설정`
            : `${badge.name} 잠금`
        }
        aria-pressed={isMain}
        className={cn(
          'flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl transition-all',
          badge.isAcquired && 'cursor-pointer',
          isMain &&
            'border border-semantic-accent-normal bg-semantic-accent-subtler',
          !badge.isAcquired && 'cursor-default bg-semantic-bg-deeper',
        )}
      >
        {badge.isAcquired ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={badge.imageUrl}
            alt={badge.name}
            className="size-full object-contain"
          />
        ) : (
          <Icon
            name="lock-filled"
            size={28}
            className="text-semantic-object-subtle"
          />
        )}
      </button>
      <span className="label-md line-clamp-1 text-center text-semantic-object-boldest">
        {badge.name}
      </span>
    </li>
  );
}

type BadgeDetailDialogProps = {
  open: boolean;
  badge: UserBadge | null;
  isMain: boolean;
  isSetting: boolean;
  isUnsetting: boolean;
  onClose: () => void;
  onSetMain: () => void;
  onUnsetMain: () => void;
};

function BadgeDetailDialog({
  open,
  badge,
  isMain,
  isSetting,
  isUnsetting,
  onClose,
  onSetMain,
  onUnsetMain,
}: BadgeDetailDialogProps) {
  if (!badge) return;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{badge.name}</Dialog.Title>
          <Dialog.Description>
            {formatDate(badge.acquiredAt)}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Graphic>
          {badge?.isAcquired ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={badge.imageUrl}
              alt={badge.name}
              width={200}
              height={200}
              className="object-contain"
            />
          ) : (
            <div className="flex size-[200px] items-center justify-center rounded-2xl bg-semantic-bg-deeper">
              <Icon
                name="lock-filled"
                size={56}
                className="text-semantic-object-subtle"
              />
            </div>
          )}
        </Dialog.Graphic>
        <Dialog.Description className="text-center">
          {badge?.description}
        </Dialog.Description>
        <Dialog.Actions layout="vertical">
          {isMain ? (
            <Button
              size="medium"
              fullWidth
              loading={isUnsetting}
              onClick={onUnsetMain}
            >
              대표 배지 해제
            </Button>
          ) : (
            badge?.isAcquired && (
              <Button
                size="medium"
                fullWidth
                loading={isSetting}
                onClick={onSetMain}
              >
                대표 배지 설정
              </Button>
            )
          )}
          <Button variant="secondary" size="medium" fullWidth onClick={onClose}>
            닫기
          </Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  );
}
