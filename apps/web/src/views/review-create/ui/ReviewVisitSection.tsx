import { type DateValue, Field, Icon, type TimeValue } from '@plog/ui';

import { formatDate, formatTime } from '@/shared/lib/datetime';

type ReviewVisitSectionProps = {
  visitDate: DateValue | null;
  startTime: TimeValue | null;
  endTime: TimeValue | null;
};

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
  visitDate,
  startTime,
  endTime,
}: ReviewVisitSectionProps) {
  return (
    <section className="flex flex-col gap-4 p-6">
      <Field label="방문 날짜">
        <ReadOnlyValueForm
          iconName="calendar"
          value={visitDate ? formatDate(visitDate, 'ko') : '-'}
        />
      </Field>
      <Field label="방문 시간">
        <div className="grid grid-cols-2 gap-4">
          <ReadOnlyValueForm
            iconName="clock"
            value={startTime ? formatTime(startTime, 'ko') : '--:--'}
          />
          <ReadOnlyValueForm
            iconName="clock"
            value={endTime ? formatTime(endTime, 'ko') : '--:--'}
          />
        </div>
      </Field>
    </section>
  );
}
