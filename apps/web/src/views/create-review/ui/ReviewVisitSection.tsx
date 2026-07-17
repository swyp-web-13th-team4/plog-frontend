import { type DateValue, Field, Icon, type TimeValue } from '@plog/ui';

import { type ReviewFormController } from '../model/use-create-review-page';

function padTimePart(value: number) {
  return String(value).padStart(2, '0');
}

function formatKoreanDate(value: DateValue) {
  return `${value.year}년 ${value.month}월 ${value.date}일`;
}

function formatKoreanTime(value: TimeValue) {
  const meridiem = value.hour < 12 ? '오전' : '오후';
  const displayHour = value.hour % 12 || 12;

  return `${meridiem} ${padTimePart(displayHour)}:${padTimePart(value.minute)}`;
}

function ReadOnlyValueForm({
  iconName,
  value,
}: {
  iconName: 'calendar' | 'clock';
  value: string;
}) {
  return (
    <div className="bg-semantic-background-subtle flex items-center justify-between gap-2 rounded-xl border border-semantic-stroke-subtle px-4 py-3">
      <span className="body-md text-semantic-object-normal">{value}</span>
      <Icon name={iconName} size={20} className="text-semantic-object-subtle" />
    </div>
  );
}

export default function ReviewVisitSection({
  controller,
}: {
  controller: ReviewFormController;
}) {
  const { endTime, startTime, visitDate } = controller;

  return (
    <section className="flex flex-col px-6 pt-6 pb-10">
      <Field label="해당 장소를 언제 방문하셨나요?" className="gap-4">
        <Field label="방문 날짜">
          <ReadOnlyValueForm
            iconName="calendar"
            value={visitDate ? formatKoreanDate(visitDate) : '-'}
          />
        </Field>

        <Field label="방문 시간">
          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyValueForm
              iconName="clock"
              value={startTime ? formatKoreanTime(startTime) : '--:--'}
            />
            <ReadOnlyValueForm
              iconName="clock"
              value={endTime ? formatKoreanTime(endTime) : '--:--'}
            />
          </div>
        </Field>
      </Field>
    </section>
  );
}
