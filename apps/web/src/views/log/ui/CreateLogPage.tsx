'use client';

import { useState } from 'react';

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

import { PlaceCategorySheet } from '@/features/select-place-category';
import { ReviewTagsSheet } from '@/features/select-review-tags';
import { WorkDateDialog } from '@/features/select-work-date';
import { WorkTimeDialog } from '@/features/select-work-time';

import { type PlaceCategoryValue, PlaceTagValue } from '@/entities/place';

import { usePhotoUpload } from '../model/use-photo-upload';
import PhotoUploader from './PhotoUploader';
import PrivacySettingSection from './PrivacySettingSection';
import RatingPicker, { type FocusLevel } from './RatingPicker';

function SectionDivider() {
  return <div className="h-2 bg-semantic-bg-deep" />;
}

type CreateFeedPageProps = {
  initialPlaceName?: string;
};

export default function CreateLogPage({
  initialPlaceName = '',
}: CreateFeedPageProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [placeName, setPlaceName] = useState(initialPlaceName);
  const [focusScore, setFocusScore] = useState<FocusLevel | null>(null);
  const [placeCategory, setPlaceCategory] = useState<PlaceCategoryValue | null>(
    null,
  );
  const [workDate, setWorkDate] = useState<DateValue | null>(null);
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  const [reviewTags, setReviewTags] = useState<PlaceTagValue[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const router = useRouter();

  const { photos, handleAddPhotos, handleRemovePhoto } = usePhotoUpload();

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
        </Field>
        <Field label="환경 기록을 작성해 주세요" required>
          <Textarea
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
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
              onClick={() => router.push('/log/place-search')}
            />
          </Field>
          <PlaceCategorySheet
            value={placeCategory}
            onChange={setPlaceCategory}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Field label="작업 날짜" required>
            <WorkDateDialog value={workDate} onChange={setWorkDate} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="시작 시간" required>
              <WorkTimeDialog
                value={startTime}
                onChange={setStartTime}
                label="시작 시간"
                name="startTime"
              />
            </Field>
            <Field label="종료 시간" required>
              <WorkTimeDialog
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
            <ReviewTagsSheet value={reviewTags} onChange={setReviewTags} />
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
