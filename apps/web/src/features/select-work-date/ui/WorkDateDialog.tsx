'use client';

import { type ReactElement, useState } from 'react';

import { Button, DatePicker, type DateValue, Dialog } from '@plog/ui';

type WorkDateDialogProps = {
  value: DateValue | null;
  onChange: (value: DateValue) => void;
  children: ReactElement;
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

export function formatDisplayDate(value: DateValue) {
  return `${value.year}.${padDatePart(value.month)}.${padDatePart(value.date)}`;
}

function serializeDateValue(value: DateValue) {
  return `${value.year}-${padDatePart(value.month)}-${padDatePart(value.date)}`;
}

export default function WorkDateDialog({
  value,
  onChange,
  children,
  name = 'workDate',
}: WorkDateDialogProps) {
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
        <Dialog.Trigger render={children} />
        <Dialog.Content className="max-w-90 gap-6 p-5">
          <Dialog.Header className="gap-1">
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
