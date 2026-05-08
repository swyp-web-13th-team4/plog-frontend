'use client';

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  useEffect,
} from 'react';
import {
  type FieldPath,
  type FieldPathValue,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button, Field, Icon, Input, Switch, Textarea } from '@plog/ui';
import { cn } from '@plog/utils';

import { type SelectedPlace } from '@/features/place-search/model/selected-place';
import { PlaceCategorySheet } from '@/features/select-place-category';
import { ReviewTagsSheet } from '@/features/select-review-tags';
import { formatDisplayDate, WorkDateDialog } from '@/features/select-work-date';
import { formatTimeValue, WorkTimeDialog } from '@/features/select-work-time';

import { PLACE_CATEGORIES } from '@/entities/place';

import { createLogResolver } from '../model/resolver';
import { type CreateLogFormValues } from '../model/types';
import { useCreateLogMutation } from '../model/use-create-log-mutation';
import { usePhotoUpload } from '../model/use-photo-upload';
import PhotoUploader from './PhotoUploader';
import PrivacySettingSection from './PrivacySettingSection';
import RatingPicker from './RatingPicker';

function SectionDivider() {
  return <div className="h-2 bg-semantic-bg-deep" />;
}

type SelectTriggerButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'value'
> & {
  ref?: Ref<HTMLButtonElement>;
  value: string | null;
  placeholder: string;
  icon: ReactNode;
};

function SelectTriggerButton({
  value,
  placeholder,
  icon,
  ref,
  ...props
}: SelectTriggerButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className="body-md flex w-full cursor-pointer items-center gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-object-inverse px-4 py-3 text-left transition-colors outline-none hover:border-semantic-stroke-alternative focus-visible:border-semantic-accent-normal focus-visible:ring-1 focus-visible:ring-semantic-accent-normal"
    >
      <span
        className={cn(
          'min-w-0 flex-1 truncate',
          value
            ? 'text-semantic-object-boldest'
            : 'text-semantic-object-subtle',
        )}
      >
        {value ?? placeholder}
      </span>
      {icon}
    </button>
  );
}

type CreateFeedPageProps = {
  initialPlace?: SelectedPlace | null;
};

export default function CreateLogPage({
  initialPlace = null,
}: CreateFeedPageProps) {
  const router = useRouter();

  const { photos, handleAddPhotos, handleRemovePhoto } = usePhotoUpload();
  const createLogMutation = useCreateLogMutation();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitted },
  } = useForm<CreateLogFormValues>({
    resolver: createLogResolver,
    defaultValues: {
      title: '',
      contents: '',
      photos: [],
      place: initialPlace,
      categoryCode: null,
      studyDate: null,
      startedAt: null,
      endedAt: null,
      focus: null,
      placeTags: [],
      isPublic: false,
    },
  });

  const titleField = register('title');
  const contentsField = register('contents');

  const place = useWatch({ control, name: 'place' });
  const placeCategory = useWatch({ control, name: 'categoryCode' });
  const workDate = useWatch({ control, name: 'studyDate' });
  const startTime = useWatch({ control, name: 'startedAt' });
  const endTime = useWatch({ control, name: 'endedAt' });
  const focusScore = useWatch({ control, name: 'focus' });
  const reviewTags = useWatch({ control, name: 'placeTags' });
  const isPublic = useWatch({ control, name: 'isPublic' });

  const setFormValue = <TFieldName extends FieldPath<CreateLogFormValues>>(
    fieldName: TFieldName,
    value: FieldPathValue<CreateLogFormValues, TFieldName>,
  ) => {
    setValue(fieldName, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    setValue('photos', photos, {
      shouldDirty: photos.length > 0,
      shouldValidate: isSubmitted,
    });
  }, [isSubmitted, photos, setValue]);

  const handleClearPlaceName = () => {
    setFormValue('place', null);
    router.replace('/log', { scroll: false });
  };

  return (
    <form
      className="bg-semantic-bg-standard"
      noValidate
      onSubmit={handleSubmit((values) => createLogMutation.mutate(values))}
    >
      <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <Field label="사진 등록" required error={errors.photos?.message}>
          <PhotoUploader
            photos={photos}
            onAdd={(files) => {
              handleAddPhotos(files);
            }}
            onRemove={(id) => {
              handleRemovePhoto(id);
            }}
          />
        </Field>
        <Field label="제목" required error={errors.title?.message}>
          <Input
            {...titleField}
            onChange={(event) => {
              titleField.onChange(event);
            }}
            onClear={() => {
              setFormValue('title', '');
            }}
            placeholder="제목을 입력해 주세요."
            maxLength={20}
          />
        </Field>
        <Field
          label="환경 기록을 작성해 주세요"
          required
          error={errors.contents?.message}
        >
          <Textarea
            {...contentsField}
            onChange={(event) => {
              contentsField.onChange(event);
            }}
            placeholder={`자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.`}
            maxLength={300}
            className="[&_textarea]:body-sm"
          />
        </Field>
      </section>
      <SectionDivider />
      <section className="flex flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-3">
          <Field label="작업 장소" required error={errors.place?.message}>
            <Input
              value={place?.name ?? ''}
              placeholder="위치를 입력해 주세요."
              readOnly
              onClear={handleClearPlaceName}
              onClick={() => router.push('/log/place-search')}
            />
          </Field>
          <Field error={errors.categoryCode?.message}>
            <PlaceCategorySheet
              value={placeCategory}
              onChange={(value) => {
                setFormValue('categoryCode', value);
              }}
            >
              <SelectTriggerButton
                value={
                  PLACE_CATEGORIES.find((c) => c.value === placeCategory)
                    ?.label ?? null
                }
                placeholder="장소 카테고리를 선택해 주세요."
                icon={
                  <Icon
                    name="chevron-right"
                    size={20}
                    className="text-semantic-object-subtle"
                  />
                }
              />
            </PlaceCategorySheet>
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <Field label="작업 날짜" required error={errors.studyDate?.message}>
            <WorkDateDialog
              value={workDate}
              onChange={(value) => {
                setFormValue('studyDate', value);
              }}
            >
              <SelectTriggerButton
                value={workDate ? formatDisplayDate(workDate) : null}
                placeholder="YYYY.MM.DD"
                icon={
                  <Icon
                    name="calendar"
                    size={20}
                    className="text-semantic-object-subtle"
                  />
                }
                aria-label="작업 날짜 선택"
              />
            </WorkDateDialog>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="시작 시간" required error={errors.startedAt?.message}>
              <WorkTimeDialog
                value={startTime}
                onChange={(value) => {
                  setFormValue('startedAt', value);
                  void trigger('endedAt');
                }}
                label="시작 시간"
                name="startTime"
              >
                <SelectTriggerButton
                  value={startTime ? formatTimeValue(startTime) : null}
                  placeholder="--:--"
                  icon={
                    <Icon
                      name="clock"
                      size={20}
                      className="text-semantic-object-subtle"
                    />
                  }
                  aria-label="시작 시간 선택"
                />
              </WorkTimeDialog>
            </Field>
            <Field label="종료 시간" required error={errors.endedAt?.message}>
              <WorkTimeDialog
                value={endTime}
                onChange={(value) => {
                  setFormValue('endedAt', value);
                }}
                label="종료 시간"
                name="endTime"
              >
                <SelectTriggerButton
                  value={endTime ? formatTimeValue(endTime) : null}
                  placeholder="--:--"
                  icon={
                    <Icon
                      name="clock"
                      size={20}
                      className="text-semantic-object-subtle"
                    />
                  }
                  aria-label="종료 시간 선택"
                />
              </WorkTimeDialog>
            </Field>
          </div>
        </div>
      </section>
      <SectionDivider />
      <section className="flex flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-4">
          <Field
            label="집중도를 평가해 주세요"
            required
            error={errors.focus?.message}
          >
            <RatingPicker
              value={focusScore}
              onChange={(value) => {
                setFormValue('focus', value);
              }}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-4 border-b border-semantic-stroke-subtler pb-6">
          <Field
            label="후기 요약 태그를 선택해 주세요"
            required
            error={errors.placeTags?.message}
          >
            <ReviewTagsSheet
              value={reviewTags}
              onChange={(value) => {
                setFormValue('placeTags', value);
              }}
            >
              <Button
                variant="outline"
                size="large"
                fullWidth
                iconLeft={<Icon name="plus" />}
                className="text-semantic-object-normal [&>svg]:size-4!"
              >
                태그 추가하기
              </Button>
            </ReviewTagsSheet>
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
            onCheckedChange={(value) => setFormValue('isPublic', value)}
            aria-label="공개 설정"
          />
        </Field>
        <PrivacySettingSection isPublic={isPublic} />
      </section>
      <section className="px-6 pt-6 pb-10">
        <Button
          fullWidth
          size="large"
          type="submit"
          disabled={createLogMutation.isPending}
        >
          {createLogMutation.isPending ? '등록 중...' : '기록하기'}
        </Button>
      </section>
    </form>
  );
}
