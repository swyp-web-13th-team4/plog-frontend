'use client';

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  useCallback,
  useMemo,
  useState,
} from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  AppBar,
  Button,
  Chip,
  type DateValue,
  Field,
  Icon,
  type IconName,
  Textarea,
  type TimeValue,
} from '@plog/ui';
import { cn } from '@plog/utils';

import {
  type PhotoPreview,
  PhotoUploader,
  usePhotoUpload,
  usePhotoUploadFeedback,
} from '@/features/photo-upload';
import { WorkDateDialog } from '@/features/select-work-date';
import { WorkTimeDialog } from '@/features/select-work-time';

const PLACE_IMAGE_SRC = '/review-place-preview.png';
const DEFAULT_PLACE_NAME = '방문 장소';

type SelectTriggerButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'value'
> & {
  ref?: Ref<HTMLButtonElement>;
  value: string | null;
  placeholder: string;
  icon: ReactNode;
};

type EnvironmentGroup = {
  name: string;
  title: string;
  iconName: IconName;
  options: string[];
};

const ENVIRONMENT_GROUPS: EnvironmentGroup[] = [
  {
    name: 'spaceSize',
    title: '공간 크기',
    iconName: 'company-filled',
    options: [
      '매우 넓어요',
      '넓은 편이에요',
      '보통이에요',
      '좁은 편이에요',
      '매우 좁아요',
    ],
  },
  {
    name: 'noiseLevel',
    title: '소음 수준',
    iconName: 'megaphone-filled',
    options: [
      '매우 조용해요',
      '조용한 편이에요',
      '보통이에요',
      '시끄러운 편이에요',
      '매우 시끄러워요',
    ],
  },
  {
    name: 'congestionLevel',
    title: '혼잡도',
    iconName: 'smile-filled',
    options: [
      '여유로워요',
      '여유 있는 편이에요',
      '보통이에요',
      '붐비는 편이에요',
      '매우 붐벼요',
    ],
  },
  {
    name: 'focusLevel',
    title: '집중도',
    iconName: 'fire-filled',
    options: [
      '매우 잘 돼요',
      '잘 되는 편이에요',
      '보통이에요',
      '잘 안 돼요',
      '전혀 안 돼요',
    ],
  },
] as const;

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

function SectionDivider() {
  return <div aria-hidden="true" className="h-2 bg-semantic-bg-deep" />;
}

function SelectTriggerButton({
  value,
  placeholder,
  icon,
  ref,
  className,
  ...props
}: SelectTriggerButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        'body-md flex w-full cursor-pointer items-center gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white px-4 py-3 text-left transition-colors outline-none hover:border-semantic-stroke-alternative focus-visible:border-semantic-accent-normal focus-visible:ring-1 focus-visible:ring-semantic-accent-normal',
        className,
      )}
    >
      <span
        className={cn(
          'min-w-0 flex-1 truncate',
          value ? 'text-semantic-object-normal' : 'text-semantic-object-subtle',
        )}
      >
        {value ?? placeholder}
      </span>
      {icon}
    </button>
  );
}

function RatingSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  return (
    <div
      role="radiogroup"
      aria-label="장소 경험 별점"
      className="flex items-center justify-center gap-3"
    >
      {stars.map((score) => {
        const selected = score <= value;

        return (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score}점`}
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg transition-transform outline-none hover:scale-105 focus-visible:outline-2 focus-visible:outline-semantic-accent-subtle"
            onClick={() => onChange(score)}
          >
            <Icon
              name="star-filled"
              size={40}
              className={
                selected
                  ? 'text-semantic-theme-amber-normal'
                  : 'text-semantic-object-subtler'
              }
            />
          </button>
        );
      })}
    </div>
  );
}

function EnvironmentChoiceGroup({
  group,
  value,
  onChange,
}: {
  group: EnvironmentGroup;
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="body-lg flex items-center gap-1.5 text-semantic-object-bold">
        <Icon
          name={group.iconName}
          size={20}
          className="text-semantic-object-subtle"
        />
        {group.title}
      </div>
      <input type="hidden" name={group.name} value={value ?? ''} />
      <div className="grid grid-cols-3 gap-3">
        {group.options.map((option) => (
          <Chip
            key={option}
            size="large"
            variant="solid"
            pressed={value === option}
            className="w-full min-w-0"
            onPressedChange={(pressed) => onChange(pressed ? option : null)}
          >
            <span className={cn('label-sm')}>{option}</span>
          </Chip>
        ))}
      </div>
    </div>
  );
}

type ReviewPageProps = {
  postId: string;
};

export default function ReviewPage({ postId }: ReviewPageProps) {
  const router = useRouter();
  const { handlePhotoConversionFailed, handlePhotoFileSizeExceeded } =
    usePhotoUploadFeedback();
  const numericPostId = Number(postId);
  const isValidPostId = Number.isInteger(numericPostId) && numericPostId > 0;

  const [rating, setRating] = useState(0);
  const [visitDate, setVisitDate] = useState<DateValue | null>(null);
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [environmentValues, setEnvironmentValues] = useState<
    Record<string, string | null>
  >({
    spaceSize: null,
    noiseLevel: null,
    congestionLevel: null,
    focusLevel: null,
  });

  const handlePhotosChange = useCallback((nextPhotos: PhotoPreview[]) => {
    setPhotos(nextPhotos);
  }, []);

  const { handleAddPhotos, handleRemovePhoto } = usePhotoUpload({
    photos,
    onPhotosChange: handlePhotosChange,
  });

  const handleEnvironmentChange = (name: string, value: string | null) => {
    setEnvironmentValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <>
      <header>
        <AppBar
          variant="navigation"
          title="장소 리뷰"
          onBack={() =>
            router.push(isValidPostId ? `/feed/${numericPostId}` : '/feed')
          }
        />
      </header>

      <form className="flex flex-col">
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="rating" value={rating} />

        <section className="px-6 pt-8 pb-10">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative size-30 overflow-hidden rounded-xl">
              <Image
                src={PLACE_IMAGE_SRC}
                alt={DEFAULT_PLACE_NAME}
                fill
                priority
                sizes="120px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col gap-2 text-center">
                <span className="label-xl text-semantic-object-boldest">
                  이곳에서의 경험은 어떠셨나요?
                </span>
                <p className="title-lg text-semantic-object-boldest">
                  {DEFAULT_PLACE_NAME}
                </p>
              </div>
              <RatingSelector value={rating} onChange={setRating} />
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="flex flex-col px-6 pt-6 pb-10">
          <Field
            label="해당 장소를 언제 방문하셨나요?"
            className="gap-4"
            required
          >
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

        <SectionDivider />

        <section className="flex flex-col px-6 pt-6 pb-10">
          <Field
            label="방문하신 장소의 환경은 어떠셨나요?"
            className="gap-4"
            required
          >
            <div className="flex flex-col gap-6">
              {ENVIRONMENT_GROUPS.map((group) => (
                <EnvironmentChoiceGroup
                  key={group.name}
                  group={group}
                  value={environmentValues[group.name] ?? null}
                  onChange={(value) =>
                    handleEnvironmentChange(group.name, value)
                  }
                />
              ))}
            </div>
          </Field>
        </section>

        <SectionDivider />

        <section className="flex flex-col gap-5 px-6 pt-6 pb-10">
          <Field label="더 자세한 후기를 남겨주세요">
            <Textarea
              name="contents"
              value={reviewText}
              maxLength={300}
              placeholder={
                '자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.'
              }
              className="h-40"
              onChange={(event) => setReviewText(event.target.value)}
            />
          </Field>

          <Field label="이미지">
            <PhotoUploader
              photos={photos}
              onAdd={handleAddPhotos}
              onRemove={handleRemovePhoto}
              onFileSizeExceeded={handlePhotoFileSizeExceeded}
              onConversionFailed={handlePhotoConversionFailed}
            />
          </Field>
        </section>

        <section className="px-6 pt-6 pb-18">
          <Button type="submit" size="large" fullWidth>
            리뷰 등록하기
          </Button>
        </section>
      </form>
    </>
  );
}
