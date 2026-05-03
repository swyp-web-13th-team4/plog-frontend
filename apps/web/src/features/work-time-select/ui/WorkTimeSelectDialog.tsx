'use client';

import { useState } from 'react';

import { Button, Dialog, TimePicker, type TimeValue } from '@plog/ui';
import { cn } from '@plog/utils';

import ClockIcon from '@/shared/assets/icons/clock.svg';

type WorkTimeSelectDialogProps = {
  value: TimeValue | null;
  onChange: (value: TimeValue) => void;
  label: string;
  name: string;
  placeholder?: string;
};

function padTimePart(value: number) {
  return String(value).padStart(2, '0');
}

function formatTimeValue(value: TimeValue) {
  return `${padTimePart(value.hour)}:${padTimePart(value.minute)}`;
}

function getCurrentTimeValue(): TimeValue {
  const now = new Date();

  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
}

export default function WorkTimeSelectDialog({
  value,
  onChange,
  label,
  name,
  placeholder = '--:--',
}: WorkTimeSelectDialogProps) {
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
      <input
        type="hidden"
        name={name}
        value={value ? formatTimeValue(value) : ''}
      />
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger
          render={
            <button
              type="button"
              className="body-md relative flex w-full items-center gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white py-3 pr-4 pl-4 text-left text-semantic-object-boldest transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle"
              aria-label={`${label} 선택`}
            >
              <span
                className={cn(
                  'min-w-0 flex-1 truncate',
                  value
                    ? 'text-semantic-object-boldest'
                    : 'text-semantic-object-subtle',
                )}
              >
                {value ? formatTimeValue(value) : placeholder}
              </span>
              <ClockIcon aria-hidden="true" className="shrink-0" />
            </button>
          }
        />

        <Dialog.Content className="max-w-90 gap-6 p-5">
          <Dialog.Header className="gap-3">
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
