'use client';

import { Button, Dialog } from '@plog/ui';

import { useDialogStore } from '@/shared/lib/dialog';

export default function GlobalDialog() {
  const { open, options, close } = useDialogStore();
  const isConfirm = options?.type === 'confirm';

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close(false)}>
      <Dialog.Content>
        <Dialog.Header>
          {options?.graphic && (
            <Dialog.Graphic>{options.graphic}</Dialog.Graphic>
          )}
          <Dialog.Title>{options?.message}</Dialog.Title>
          {options?.description && (
            <Dialog.Description>{options.description}</Dialog.Description>
          )}
        </Dialog.Header>
        <Dialog.Actions>
          {isConfirm && (
            <Button
              variant="secondary"
              size="medium"
              fullWidth
              onClick={() => close(false)}
            >
              {options?.cancelLabel ?? '취소'}
            </Button>
          )}
          <Button
            variant="primary"
            size="medium"
            fullWidth
            onClick={() => close(true)}
          >
            {options?.confirmLabel ?? '확인'}
          </Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  );
}
