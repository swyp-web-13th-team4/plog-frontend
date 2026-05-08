import { Icon, type IconName } from '@plog/ui';

type StatCardProps = {
  icon: IconName;
  label: string;
  value: number;
  unit: string;
};

function StatCard({ icon, label, value, unit }: StatCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-semantic-stroke-subtle bg-semantic-bg-standard p-4">
      <div className="flex items-center gap-1.5">
        <Icon name={icon} size={18} className="text-semantic-object-subtle" />
        <span className="label-md text-semantic-object-bold">{label}</span>
      </div>
      <p className="title-lg text-semantic-object-boldest">
        {value.toLocaleString()}
        <span className="title-sm ml-0.5">{unit}</span>
      </p>
    </div>
  );
}

type StatsCardsProps = {
  totalPostCount: number;
  totalStudyTime: number;
};

export default function StatsCards({
  totalPostCount,
  totalStudyTime,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <StatCard
        icon="document"
        label="기록 횟수"
        value={totalPostCount}
        unit="회"
      />
      <StatCard
        icon="clock"
        label="작업 시간"
        value={Math.floor(totalStudyTime / 60)}
        unit="h"
      />
    </div>
  );
}
