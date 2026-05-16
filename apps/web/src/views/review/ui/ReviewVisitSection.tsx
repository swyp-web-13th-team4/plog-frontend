import { type DateValue, Field, Icon, type TimeValue } from '@plog/ui';

import { WorkDateDialog } from '@/features/select-work-date';
import { WorkTimeDialog } from '@/features/select-work-time';

import { type ReviewFormController } from '../model/use-review-page';
import SelectTriggerButton from './SelectTriggerButton';

type ReviewVisitSectionProps = {
  controller: ReviewFormController;
};

function formatKoreanDate(value: DateValue) {
  return `${value.year}년 ${value.month}월 ${value.date}일`;
}

function padTimePart(value: number) {
  return String(value).padStart(2, '0');
}

function formatKoreanTime(value: TimeValue) {
  const meridiem = value.hour < 12 ? '오전' : '오후';
  const displayHour = value.hour % 12 || 12;

  return `${meridiem} ${padTimePart(displayHour)}:${padTimePart(value.minute)}`;
}

export default function ReviewVisitSection({
  controller,
}: ReviewVisitSectionProps) {
  const {
    endTime,
    setEndTime,
    setStartTime,
    setVisitDate,
    startTime,
    visitDate,
  } = controller;

  return (
    <section className="flex flex-col px-6 pt-6 pb-10">
      <Field label="해당 장소를 언제 방문하셨나요?" className="gap-4" required>
        <Field label="방문 날짜">
          <WorkDateDialog value={visitDate} onChange={setVisitDate}>
            <SelectTriggerButton
              value={visitDate ? formatKoreanDate(visitDate) : null}
              placeholder="방문 날짜 선택"
              icon={
                <Icon
                  name="calendar"
                  size={20}
                  className="text-semantic-object-subtle"
                />
              }
              aria-label="방문 날짜 선택"
            />
          </WorkDateDialog>
        </Field>

        <Field label="방문 시간">
          <div className="grid grid-cols-2 gap-4">
            <WorkTimeDialog
              value={startTime}
              onChange={setStartTime}
              label="방문 시작 시간"
              name="startedAt"
            >
              <SelectTriggerButton
                value={startTime ? formatKoreanTime(startTime) : null}
                placeholder="--:--"
                icon={
                  <Icon
                    name="clock"
                    size={20}
                    className="text-semantic-object-subtle"
                  />
                }
                aria-label="방문 시작 시간 선택"
              />
            </WorkTimeDialog>
            <WorkTimeDialog
              value={endTime}
              onChange={setEndTime}
              label="방문 종료 시간"
              name="endedAt"
            >
              <SelectTriggerButton
                value={endTime ? formatKoreanTime(endTime) : null}
                placeholder="--:--"
                icon={
                  <Icon
                    name="clock"
                    size={20}
                    className="text-semantic-object-subtle"
                  />
                }
                aria-label="방문 종료 시간 선택"
              />
            </WorkTimeDialog>
          </div>
        </Field>
      </Field>
    </section>
  );
}
