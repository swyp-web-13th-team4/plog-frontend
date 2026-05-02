'use client';

import { useState } from 'react';

import { Button, Field, Input, Select, Switch, Textarea } from '@plog/ui';
import { cn } from '@plog/utils';

import FocusLevel1 from '@/shared/assets/focus-levels/focus-level-1.svg';
import FocusLevel2 from '@/shared/assets/focus-levels/focus-level-2.svg';
import FocusLevel3 from '@/shared/assets/focus-levels/focus-level-3.svg';
import FocusLevel4 from '@/shared/assets/focus-levels/focus-level-4.svg';
import FocusLevel5 from '@/shared/assets/focus-levels/focus-level-5.svg';
import FocusLevelSelect1 from '@/shared/assets/focus-levels/focus-level-select-1.svg';
import FocusLevelSelect2 from '@/shared/assets/focus-levels/focus-level-select-2.svg';
import FocusLevelSelect3 from '@/shared/assets/focus-levels/focus-level-select-3.svg';
import FocusLevelSelect4 from '@/shared/assets/focus-levels/focus-level-select-4.svg';
import FocusLevelSelect5 from '@/shared/assets/focus-levels/focus-level-select-5.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import CameraIcon from '@/shared/assets/icons/camera.svg';
import ClockIcon from '@/shared/assets/icons/clock.svg';
import InfoIcon from '@/shared/assets/icons/Info.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';

type FocusScore = 1 | 2 | 3 | 4 | 5;

const FOCUS_LEVEL_OPTIONS = [
  {
    value: 1,
    label: '매우 낮음',
    DefaultIcon: FocusLevel1,
    SelectedIcon: FocusLevelSelect1,
  },
  {
    value: 2,
    label: '낮음',
    DefaultIcon: FocusLevel2,
    SelectedIcon: FocusLevelSelect2,
  },
  {
    value: 3,
    label: '보통',
    DefaultIcon: FocusLevel3,
    SelectedIcon: FocusLevelSelect3,
  },
  {
    value: 4,
    label: '높음',
    DefaultIcon: FocusLevel4,
    SelectedIcon: FocusLevelSelect4,
  },
  {
    value: 5,
    label: '매우 높음',
    DefaultIcon: FocusLevel5,
    SelectedIcon: FocusLevelSelect5,
  },
] as const;

const PLACE_CATEGORY_OPTIONS = [
  { label: '공원', value: 'park' },
  { label: '하천', value: 'river' },
  { label: '등산로', value: 'trail' },
  { label: '해변', value: 'beach' },
  { label: '기타', value: 'etc' },
];

const PRIVACY_SETTING_OPTIONS = [
  {
    type: 'all',
    title: '이 기록은 피드에 공유됩니다',
    content: '다른 사용자들이 회원님의 환경 기록을 볼 수 있습니다.',
    Icon: InfoIcon,
  },
  {
    type: 'private',
    title: '이 기록은 나만 볼 수 있습니다',
    content: '비공개로 설정되어 다른 사용자들이 볼 수 없습니다.',
    Icon: ClockIcon,
  },
] as const;

function PhotoUploader() {
  return (
    <button
      type="button"
      className="flex size-25 flex-col items-center justify-center gap-1 rounded-xl border border-semantic-stroke-subtle bg-semantic-bg-standard text-semantic-object-normal transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle"
      aria-label="사진 등록"
    >
      <CameraIcon />
      <span className="label-sm">0/5</span>
    </button>
  );
}

function SectionDivider() {
  return <div className="h-2 bg-semantic-bg-deep" />;
}

function RatingPicker({
  value,
  onChange,
}: {
  value: FocusScore | null;
  onChange: (score: FocusScore) => void;
}) {
  return (
    <div className="grid w-full grid-cols-5 gap-2">
      {FOCUS_LEVEL_OPTIONS.map(
        ({ value: score, label, DefaultIcon, SelectedIcon }) => {
          const isSelected = value === score;
          const RatingIcon = isSelected ? SelectedIcon : DefaultIcon;

          return (
            <label
              key={score}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm transition outline-none focus-within:ring-2 focus-within:ring-semantic-accent-normal focus-within:ring-offset-2 focus-within:ring-offset-semantic-bg-standard"
            >
              <input
                type="radio"
                name="focusScore"
                value={score}
                checked={isSelected}
                onChange={() => onChange(score)}
                className="sr-only"
                aria-label={`집중도 ${score}점, ${label}`}
              />
              <RatingIcon aria-hidden="true" />
            </label>
          );
        },
      )}
    </div>
  );
}

function PrivacySettingSection({ isPublic }: { isPublic: boolean }) {
  const privacyType = isPublic ? 'all' : 'private';
  const { title, content, Icon } =
    PRIVACY_SETTING_OPTIONS.find(({ type }) => type === privacyType) ??
    PRIVACY_SETTING_OPTIONS[0];

  return (
    <div
      className={cn(
        'flex gap-2 rounded-xl p-4',
        isPublic ? 'bg-semantic-accent-subtler' : 'bg-semantic-object-subtler',
      )}
    >
      <div
        className={cn(
          'shrink-0',
          isPublic
            ? 'text-semantic-accent-normal'
            : 'text-semantic-object-normal',
        )}
      >
        <Icon />
      </div>
      <div className="min-w-0 flex-1">
        <p className="label-lg text-semantic-object-bold">{title}</p>
        <p className="label-md mt-1 text-semantic-object-normal">{content}</p>
      </div>
    </div>
  );
}

export default function CreateFeedPage() {
  const [title, setTitle] = useState('');
  const [focusScore, setFocusScore] = useState<FocusScore | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  return (
    <form className="bg-semantic-bg-standard">
      <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <Field label="사진 등록" required>
          <PhotoUploader />
        </Field>

        <Field label="제목" required>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onClear={() => setTitle('')}
            placeholder="제목을 입력해 주세요."
            maxLength={20}
          />
          <span className="caption-md mt-1.5 mr-2 ml-auto text-semantic-object-subtle">
            {title.length}/20자
          </span>
        </Field>

        <Field label="환경 기록을 작성해 주세요" required>
          <Textarea
            placeholder={`자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.`}
            maxLength={300}
            className="[&_textarea]:body-sm [&_textarea]:h-40"
          />
        </Field>
      </section>

      <SectionDivider />

      <section className="flex flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-3">
          <Field label="작업 장소" required>
            <Input placeholder="위치를 입력해 주세요." />
          </Field>

          <Select
            options={PLACE_CATEGORY_OPTIONS}
            placeholder="장소 카테고리를 선택해 주세요."
            aria-label="장소 카테고리"
            className="body-md h-auto w-full px-4 py-3 text-semantic-object-normal [&>svg]:size-5"
            contentClassName="w-[var(--anchor-width)]"
            optionClassName="body-md w-full px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Field label="작업 날짜" required>
            <Input
              placeholder="YYYY.MM.DD"
              inputMode="numeric"
              trailing={<CalendarIcon />}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="시작 시간" required>
              <Input
                placeholder="--:--"
                inputMode="numeric"
                trailing={<ClockIcon />}
              />
            </Field>
            <Field label="종료 시간" required>
              <Input
                placeholder="--:--"
                inputMode="numeric"
                trailing={<ClockIcon />}
              />
            </Field>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="flex flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-4">
          <Field label="집중도를 평가해 주세요" required>
            <RatingPicker value={focusScore} onChange={setFocusScore} />
          </Field>
        </div>

        <div className="flex flex-col gap-4 border-b border-semantic-stroke-subtler pb-6">
          <Field label="후기 요약 태그를 선택해주세요" required>
            <Button
              variant="outline"
              size="large"
              fullWidth
              iconLeft={<PlusIcon />}
              className="text-semantic-object-normal"
            >
              태그 추가하기
            </Button>
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-4 px-6 pt-6 pb-10">
        <Field
          label="공개 설정"
          required
          className="flex-row items-center justify-between"
        >
          <Switch
            checked={isPublic}
            onCheckedChange={setIsPublic}
            aria-label="공개 설정"
          />
        </Field>
        <PrivacySettingSection isPublic={isPublic} />
      </section>
      <section className="px-6 pt-6 pb-10">
        <Button fullWidth size="large" disabled type="submit">
          기록하기
        </Button>
      </section>
    </form>
  );
}
