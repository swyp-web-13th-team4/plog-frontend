'use client';

import { useState } from 'react';

import { Button, DatePicker, type DateValue, Dialog } from '@plog/ui';
import { cn } from '@plog/utils';

import CalendarIcon from '@/shared/assets/icons/calendar.svg';

type WorkDateSelectDialogProps = {
  value: DateValue | null;
  onChange: (value: DateValue) => void;
  placeholder?: string;
  name?: string;
};

function getTodayValue(): DateValue {
  const today = new Date();

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };
}

function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

function formatDisplayDate(value: DateValue) {
  return `${value.year}.${padDatePart(value.month)}.${padDatePart(value.date)}`;
}

function serializeDateValue(value: DateValue) {
  return `${value.year}-${padDatePart(value.month)}-${padDatePart(value.date)}`;
}

export default function WorkDateSelectDialog({
  value,
  onChange,
  placeholder = 'YYYY.MM.DD',
  name = 'workDate',
}: WorkDateSelectDialogProps) {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<DateValue>(
    value ?? getTodayValue(),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftValue(value ?? getTodayValue());
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
        value={value ? serializeDateValue(value) : ''}
      />
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger
          render={
            <button
              type="button"
              className="body-md relative flex w-full items-center gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white py-3 pr-4 pl-4 text-left text-semantic-object-boldest transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle"
              aria-label="작업 날짜 선택"
            >
              <span
                className={cn(
                  'min-w-0 flex-1 truncate',
                  value
                    ? 'text-semantic-object-boldest'
                    : 'text-semantic-object-subtle',
                )}
              >
                {value ? formatDisplayDate(value) : placeholder}
              </span>
              <CalendarIcon aria-hidden="true" className="shrink-0" />
            </button>
          }
        />

        <Dialog.Content className="max-w-90 gap-6 p-5">
          <Dialog.Header className="gap-3">
            <Dialog.Title>날짜 선택</Dialog.Title>
            <Dialog.Description>
              방문한 날짜를 선택해 주세요.
            </Dialog.Description>
          </Dialog.Header>

          <Dialog.Body className="flex justify-center">
            <DatePicker value={draftValue} onChange={setDraftValue} />
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
