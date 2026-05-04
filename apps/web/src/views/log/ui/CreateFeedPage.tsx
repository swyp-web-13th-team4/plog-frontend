'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Button,
  type DateValue,
  Field,
  Input,
  Switch,
  Textarea,
  type TimeValue,
} from '@plog/ui';
import { cn } from '@plog/utils';

import { PlaceCategorySelectBottomSheet } from '@/features/place-category-select';
import { ReviewTagsSelectBottomSheet } from '@/features/review-tags-select';
import { WorkDateSelectDialog } from '@/features/work-date-select';
import { WorkTimeSelectDialog } from '@/features/work-time-select';

import { type PlaceTagValue } from '@/entities/log';
import { type PlaceCategoryValue } from '@/entities/place';

import FocusLevelDefault1 from '@/shared/assets/focus-levels/focus-level-default-1.svg';
import FocusLevelDefault2 from '@/shared/assets/focus-levels/focus-level-default-2.svg';
import FocusLevelDefault3 from '@/shared/assets/focus-levels/focus-level-default-3.svg';
import FocusLevelDefault4 from '@/shared/assets/focus-levels/focus-level-default-4.svg';
import FocusLevelDefault5 from '@/shared/assets/focus-levels/focus-level-default-5.svg';
import FocusLevelSelect1 from '@/shared/assets/focus-levels/focus-level-select-1.svg';
import FocusLevelSelect2 from '@/shared/assets/focus-levels/focus-level-select-2.svg';
import FocusLevelSelect3 from '@/shared/assets/focus-levels/focus-level-select-3.svg';
import FocusLevelSelect4 from '@/shared/assets/focus-levels/focus-level-select-4.svg';
import FocusLevelSelect5 from '@/shared/assets/focus-levels/focus-level-select-5.svg';
import CameraIcon from '@/shared/assets/icons/camera.svg';
import ClockIcon from '@/shared/assets/icons/clock.svg';
import InfoIcon from '@/shared/assets/icons/Info.svg';
type FocusScore = 1 | 2 | 3 | 4 | 5;

type PhotoPreview = {
  id: string;
  file: File;
  url: string;
};

const MAX_PHOTO_COUNT = 5;

const FOCUS_LEVEL_OPTIONS = [
  {
    value: 1,
    label: '매우 낮음',
    DefaultIcon: FocusLevelDefault1,
    SelectedIcon: FocusLevelSelect1,
  },
  {
    value: 2,
    label: '낮음',
    DefaultIcon: FocusLevelDefault2,
    SelectedIcon: FocusLevelSelect2,
  },
  {
    value: 3,
    label: '보통',
    DefaultIcon: FocusLevelDefault3,
    SelectedIcon: FocusLevelSelect3,
  },
  {
    value: 4,
    label: '높음',
    DefaultIcon: FocusLevelDefault4,
    SelectedIcon: FocusLevelSelect4,
  },
  {
    value: 5,
    label: '매우 높음',
    DefaultIcon: FocusLevelDefault5,
    SelectedIcon: FocusLevelSelect5,
  },
] as const;

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

function createPhotoPreview(file: File, index: number): PhotoPreview {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
    file,
    url: URL.createObjectURL(file),
  };
}

function PhotoUploader({
  photos,
  onAdd,
  onRemove,
}: {
  photos: PhotoPreview[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMore = photos.length < MAX_PHOTO_COUNT;

  useEffect(() => {
    if (!fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    photos.forEach(({ file }) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  }, [photos]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith('image/'),
    );

    if (selectedFiles.length === 0) return;
    onAdd(selectedFiles);
  };

  return (
    <div className="flex gap-4 pt-1 pb-1">
      <input
        ref={fileInputRef}
        type="file"
        name="photos"
        accept=".jpg, .png, .heic"
        multiple
        className="sr-only"
        onChange={handleFileChange}
      />

      <button
        type="button"
        disabled={!canAddMore}
        className="flex size-25 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-semantic-stroke-subtle bg-semantic-bg-standard text-semantic-object-normal transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle"
        aria-label="사진 등록"
        onClick={() => fileInputRef.current?.click()}
      >
        <CameraIcon />
        <span className="label-sm">
          {photos.length}/{MAX_PHOTO_COUNT}
        </span>
      </button>

      <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative size-25 shrink-0 overflow-hidden rounded-xl bg-semantic-object-subtler"
            >
              <Image
                src={photo.url}
                alt={`등록된 사진 ${index + 1}`}
                fill
                sizes="100px"
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-semantic-system-white bg-semantic-feedback-error-normal text-xl leading-none shadow-[0_2px_6px_rgba(0,0,0,0.16)]"
                aria-label={`등록된 사진 ${index + 1} 삭제`}
                onClick={() => onRemove(photo.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
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
              className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-visible rounded-sm transition outline-none focus-within:ring-2 focus-within:ring-semantic-accent-normal focus-within:ring-offset-2 focus-within:ring-offset-semantic-bg-standard"
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
              <RatingIcon
                aria-hidden="true"
                className="block size-full scale-140"
              />
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

type CreateFeedPageProps = {
  initialPlaceName?: string;
};

export default function CreateFeedPage({
  initialPlaceName = '',
}: CreateFeedPageProps) {
  const photoPreviewsRef = useRef<PhotoPreview[]>([]);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [placeName, setPlaceName] = useState(initialPlaceName);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [focusScore, setFocusScore] = useState<FocusScore | null>(null);
  const [placeCategory, setPlaceCategory] = useState<PlaceCategoryValue | null>(
    null,
  );
  const [workDate, setWorkDate] = useState<DateValue | null>(null);
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  const [reviewTags, setReviewTags] = useState<PlaceTagValue[]>([]);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    photoPreviewsRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photoPreviewsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleAddPhotos = (files: File[]) => {
    setPhotos((currentPhotos) => {
      const availableCount = MAX_PHOTO_COUNT - currentPhotos.length;
      const nextFiles = files.slice(0, availableCount);

      return [
        ...currentPhotos,
        ...nextFiles.map((file, index) => createPhotoPreview(file, index)),
      ];
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((currentPhotos) => {
      const targetPhoto = currentPhotos.find((photo) => photo.id === id);
      if (targetPhoto) URL.revokeObjectURL(targetPhoto.url);

      return currentPhotos.filter((photo) => photo.id !== id);
    });
  };

  const handleClearPlaceName = () => {
    setPlaceName('');
    router.replace('/log', { scroll: false });
  };

  return (
    <form className="bg-semantic-bg-standard">
      <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <Field label="사진 등록" required>
          <PhotoUploader
            photos={photos}
            onAdd={handleAddPhotos}
            onRemove={handleRemovePhoto}
          />
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
            <Input
              value={placeName}
              placeholder="위치를 입력해 주세요."
              readOnly
              onClear={handleClearPlaceName}
              onClick={() => router.push('/log/place')}
            />
          </Field>

          <PlaceCategorySelectBottomSheet
            value={placeCategory}
            onChange={setPlaceCategory}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Field label="작업 날짜" required>
            <WorkDateSelectDialog value={workDate} onChange={setWorkDate} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="시작 시간" required>
              <WorkTimeSelectDialog
                value={startTime}
                onChange={setStartTime}
                label="시작 시간"
                name="startTime"
              />
            </Field>
            <Field label="종료 시간" required>
              <WorkTimeSelectDialog
                value={endTime}
                onChange={setEndTime}
                label="종료 시간"
                name="endTime"
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
            <ReviewTagsSelectBottomSheet
              value={reviewTags}
              onChange={setReviewTags}
            />
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
        <Button fullWidth size="large" type="submit">
          기록하기
        </Button>
      </section>
    </form>
  );
}
