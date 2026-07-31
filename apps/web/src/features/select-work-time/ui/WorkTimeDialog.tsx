'use client';

import { type ReactElement, useState } from 'react';

import { Button, Dialog, TimePicker, type TimeValue } from '@plog/ui';

type WorkTimeDialogProps = {
  value: TimeValue | null;
  onChange: (value: TimeValue) => void;
  children: ReactElement;
  label: string;
};

function getCurrentTimeValue(): TimeValue {
  const now = new Date();

  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
}

export default function WorkTimeDialog({
  value,
  onChange,
  children,
  label,
}: WorkTimeDialogProps) {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<TimeValue>(
    value ?? getCurrentTimeValue(),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftValue(value ?? getCurrentTimeValue());
    }

    setOpen(nextOpen);
  };

  const handleConfirm = () => {
    onChange(draftValue);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger render={children} />
        <Dialog.Content className="max-w-90 gap-6 p-5">
          <Dialog.Header className="gap-1">
            <Dialog.Title>시간 선택</Dialog.Title>
            <Dialog.Description>
              방문한 시간을 선택해 주세요.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body className="flex justify-center">
            <TimePicker
              value={draftValue}
              onChange={setDraftValue}
              aria-label={label}
              minuteStep={10}
            />
          </Dialog.Body>
          <Dialog.Actions>
            <Button size="medium" fullWidth onClick={handleConfirm}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
