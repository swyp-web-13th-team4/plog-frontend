import { Icon } from '@plog/ui';

import { type AnalyticsFocusEnvironment } from '@/entities/user';

import {
  getBestTagSentence,
  getTimeSentence,
  getWorstTagSentence,
  type SentenceResult,
} from '../../model/focus-environment';

function HighlightText({ sentence, highlight }: SentenceResult) {
  if (!highlight) return <>{sentence}</>;
  const parts = sentence.split(highlight);
  return (
    <>
      {parts[0]}
      <span className="text-semantic-accent-neutral">{highlight}</span>
      {parts[1]}
    </>
  );
}

type ConditionRowProps = {
  iconName: 'clock-filled' | 'like-filled' | 'dislike-filled';
  result: SentenceResult;
  locked?: boolean;
  lockedLabel?: string;
};

function ConditionRow({
  iconName,
  result,
  locked = false,
  lockedLabel,
}: ConditionRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-semantic-bg-deep px-5 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-semantic-stroke-subtle bg-semantic-object-inverse">
        <Icon
          name={locked ? 'question' : iconName}
          size={26}
          className={
            locked
              ? 'text-semantic-object-subtle'
              : 'text-semantic-accent-neutral'
          }
        />
      </div>
      <p className="label-md pt-1 break-keep text-semantic-object-bold">
        {locked ? (
          <span className="text-semantic-object-normal">{lockedLabel}</span>
        ) : (
          <HighlightText {...result} />
        )}
      </p>
    </div>
  );
}

const LOCKED_RESULT: SentenceResult = { sentence: '', highlight: '' };

type FocusEnvironmentSectionProps = {
  data: AnalyticsFocusEnvironment | null;
};

export default function FocusEnvironmentSection({
  data,
}: FocusEnvironmentSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="title-sm text-semantic-object-boldest">
        나에게 맞는 집중 환경 조건
      </h2>
      <div className="flex flex-col gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-object-inverse px-5 py-6">
        <ConditionRow
          iconName="clock-filled"
          result={
            data
              ? getTimeSentence(
                  data.bestTimePeriod,
                  data.bestTimePeriodAvgFocus,
                )
              : LOCKED_RESULT
          }
          locked={!data}
          lockedLabel="나의 몰입도가 가장 높은 시간대를 분석해 드려요."
        />
        <ConditionRow
          iconName="like-filled"
          result={
            data
              ? getBestTagSentence(data.bestPlaceTag, data.bestPlaceTagAvgFocus)
              : LOCKED_RESULT
          }
          locked={!data}
          lockedLabel="나에게 맞는 최적의 몰입 환경 조건을 찾아드려요."
        />
        <ConditionRow
          iconName="dislike-filled"
          result={
            data
              ? getWorstTagSentence(
                  data.worstPlaceTag,
                  data.worstPlaceTagAvgFocus,
                )
              : LOCKED_RESULT
          }
          locked={!data}
          lockedLabel="나의 집중력을 방해하는 환경 요소를 분석해 드려요."
        />
      </div>
    </section>
  );
}
