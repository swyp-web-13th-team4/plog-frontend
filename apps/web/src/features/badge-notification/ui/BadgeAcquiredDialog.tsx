'use client';

import { useRouter } from 'next/navigation';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button, Dialog } from '@plog/ui';

import { type BadgeGrantPayload } from '../model/types';

type BadgeAcquiredDialogProps = {
  open: boolean;
  badge: BadgeGrantPayload | null;
  onClose: () => void;
};

export default function BadgeAcquiredDialog({
  open,
  badge,
  onClose,
}: BadgeAcquiredDialogProps) {
  const router = useRouter();

  if (!badge) return null;

  const handleConfirm = () => {
    onClose();
    router.push('/my?tab=badge');
  };

  return (
    <>
      {open && (
        <div className="pointer-events-none fixed top-0 left-1/2 z-300 w-[250%] -translate-x-1/2">
          <DotLottieReact src="/confetti.lottie" autoplay />
        </div>
      )}
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>배지를 획득했어요!</Dialog.Title>
            <Dialog.Description className="text-center">
              {badge.name}
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Graphic>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badge.imageUrl}
              alt={badge.name}
              width={200}
              height={200}
              className="object-contain"
            />
          </Dialog.Graphic>
          <Dialog.Actions layout="horizontal">
            <Button
              variant="secondary"
              size="medium"
              fullWidth
              onClick={onClose}
            >
              닫기
            </Button>
            <Button size="medium" fullWidth onClick={handleConfirm}>
              배지 확인하기
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
