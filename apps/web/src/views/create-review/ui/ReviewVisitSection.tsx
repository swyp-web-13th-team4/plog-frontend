import { type DateValue, Field, Icon, type TimeValue } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';

import { type ReviewFormController } from '../model/use-create-review-page';

type ReviewVisitSectionProps = {
  controller: ReviewFormController;
};

function formatKoreanDate(value: DateValue) {
  return `${value.year}년 ${value.month}월 ${value.date}일`;
}

function padTimePart(value: number) {
  return String(value).padStart(2, '0');
}

function serializeDateValue(value: DateValue) {
  return `${value.year}-${padTimePart(value.month)}-${padTimePart(value.date)}`;
}

function serializeTimeValue(value: TimeValue) {
  return `${padTimePart(value.hour)}:${padTimePart(value.minute)}`;
}

function formatKoreanTime(value: TimeValue) {
  const meridiem = value.hour < 12 ? '오전' : '오후';
  const displayHour = value.hour % 12 || 12;

  return `${meridiem} ${padTimePart(displayHour)}:${padTimePart(value.minute)}`;
}

export default function ReviewVisitSection({
  controller,
}: ReviewVisitSectionProps) {
  const { endTime, startTime, visitDate } = controller;

  return (
    <section className="flex flex-col px-6 pt-6 pb-10">
      <Field label="해당 장소를 언제 방문하셨나요?" className="gap-4" required>
        <Field label="방문 날짜">
          <input
            type="hidden"
            name="workDate"
            value={visitDate ? serializeDateValue(visitDate) : ''}
          />
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
            aria-label="방문 날짜"
            className="cursor-not-allowed text-semantic-object-subtler"
            disabled
          />
        </Field>

        <Field label="방문 시간">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="hidden"
                name="startedAt"
                value={startTime ? serializeTimeValue(startTime) : ''}
              />
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
                aria-label="방문 시작 시간"
                className="cursor-not-allowed text-semantic-object-subtler"
                disabled
              />
            </div>
            <div>
              <input
                type="hidden"
                name="endedAt"
                value={endTime ? serializeTimeValue(endTime) : ''}
              />
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
                aria-label="방문 종료 시간"
                className="cursor-not-allowed text-semantic-object-subtler"
                disabled
              />
            </div>
          </div>
        </Field>
      </Field>
    </section>
  );
}
