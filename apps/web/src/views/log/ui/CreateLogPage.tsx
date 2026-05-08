'use client';

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  useEffect,
} from 'react';
import {
  type FieldErrors,
  type FieldPath,
  type FieldPathValue,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useRouter } from 'next/navigation';

import {
  Button,
  Field,
  Icon,
  Input,
  Switch,
  Textarea,
  useToast,
} from '@plog/ui';
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
import {
  getCreateLogFormDefaultValues,
  useCreateLogStore,
} from '../model/use-create-log-store';
import { usePhotoUpload } from '../model/use-photo-upload';
import { useScrollFocusFeedback } from '../model/use-scroll-focus-feedback';
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
  const {
    fieldRef: photoFieldRef,
    focusRef: photoUploadButtonRef,
    trigger: triggerPhotoFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLButtonElement>();
  const {
    fieldRef: titleFieldRef,
    focusRef: titleInputRef,
    trigger: triggerTitleFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLElement>();
  const {
    fieldRef: contentsFieldRef,
    focusRef: contentsInputRef,
    trigger: triggerContentsFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLTextAreaElement>();
  const {
    fieldRef: placeFieldRef,
    focusRef: placeInputRef,
    trigger: triggerPlaceFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLElement>();
  const {
    fieldRef: placeCategoryFieldRef,
    focusRef: placeCategoryButtonRef,
    trigger: triggerPlaceCategoryFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLButtonElement>();
  const {
    fieldRef: workDateFieldRef,
    focusRef: workDateButtonRef,
    trigger: triggerWorkDateFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLButtonElement>();
  const {
    fieldRef: workTimeFieldRef,
    focusRef: startTimeButtonRef,
    secondaryFocusRef: endTimeButtonRef,
    trigger: triggerWorkTimeFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLButtonElement>();
  const {
    fieldRef: focusFieldRef,
    focusRef: focusFirstButtonRef,
    trigger: triggerFocusFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLButtonElement>();
  const {
    fieldRef: reviewTagsFieldRef,
    focusRef: reviewTagsButtonRef,
    trigger: triggerReviewTagsFeedback,
  } = useScrollFocusFeedback<HTMLDivElement, HTMLButtonElement>();

  const { photos, handleAddPhotos, handleRemovePhoto } = usePhotoUpload();
  const { toast } = useToast();
  const setCreateLogValues = useCreateLogStore((state) => state.setValues);
  const setCreateLogHasPhotos = useCreateLogStore(
    (state) => state.setHasPhotos,
  );
  const resetCreateLog = useCreateLogStore((state) => state.reset);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    trigger,
    control,
    formState: { errors, isSubmitted },
  } = useForm<CreateLogFormValues>({
    resolver: createLogResolver,
    defaultValues: getCreateLogFormDefaultValues(initialPlace),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const createLogMutation = useCreateLogMutation({
    onSuccess: resetCreateLog,
    onTitleForbidden: () => {
      setError('title', {
        type: 'server',
        message: '사용할 수 없는 단어가 포함되어 있어요.',
      });
      triggerTitleFeedback();
    },
    onContentsForbidden: () => {
      setError('contents', {
        type: 'server',
        message: '사용할 수 없는 단어가 포함되어 있어요.',
      });
      triggerContentsFeedback();
    },
  });

  const titleField = register('title');
  const contentsField = register('contents');

  const title = useWatch({ control, name: 'title' });
  const contents = useWatch({ control, name: 'contents' });
  const place = useWatch({ control, name: 'place' });
  const placeCategory = useWatch({ control, name: 'categoryCode' });
  const workDate = useWatch({ control, name: 'studyDate' });
  const startTime = useWatch({ control, name: 'startedAt' });
  const endTime = useWatch({ control, name: 'endedAt' });
  const focusScore = useWatch({ control, name: 'focus' });
  const reviewTags = useWatch({ control, name: 'placeTags' });
  const scope = useWatch({ control, name: 'scope' });
  const isPublic = scope === 'PUBLIC';

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
    setCreateLogHasPhotos(photos.length > 0);
  }, [isSubmitted, photos, setCreateLogHasPhotos, setValue]);

  useEffect(() => {
    setCreateLogValues({
      title,
      contents,
      place,
      categoryCode: placeCategory,
      studyDate: workDate,
      startedAt: startTime,
      endedAt: endTime,
      focus: focusScore,
      placeTags: reviewTags,
      scope,
    });
  }, [
    contents,
    endTime,
    focusScore,
    place,
    placeCategory,
    reviewTags,
    setCreateLogValues,
    scope,
    startTime,
    title,
    workDate,
  ]);

  const handleClearPlaceName = () => {
    setFormValue('place', null);
    router.replace('/log', { scroll: false });
  };

  const handleInvalidSubmit = (
    fieldErrors: FieldErrors<CreateLogFormValues>,
  ) => {
    const photoErrorMessage = fieldErrors.photos?.message;

    if (photoErrorMessage) {
      triggerPhotoFeedback();
      toast({
        type: 'error',
        description: photoErrorMessage,
      });
      return;
    }

    if (fieldErrors.title) {
      triggerTitleFeedback();
      return;
    }

    if (fieldErrors.contents) {
      triggerContentsFeedback();
      return;
    }

    const placeErrorMessage = fieldErrors.place?.message;

    if (placeErrorMessage) {
      triggerPlaceFeedback();
      toast({
        type: 'error',
        description: placeErrorMessage,
      });
      return;
    }

    const placeCategoryErrorMessage = fieldErrors.categoryCode?.message;

    if (placeCategoryErrorMessage) {
      triggerPlaceCategoryFeedback();
      toast({
        type: 'error',
        description: placeCategoryErrorMessage,
      });
      return;
    }

    const workDateErrorMessage = fieldErrors.studyDate?.message;

    if (workDateErrorMessage) {
      triggerWorkDateFeedback();
      toast({
        type: 'error',
        description: workDateErrorMessage,
      });
      return;
    }

    if (fieldErrors.startedAt || fieldErrors.endedAt) {
      const { startedAt, endedAt } = getValues();
      const message =
        fieldErrors.startedAt?.message ?? fieldErrors.endedAt?.message;

      triggerWorkTimeFeedback(startedAt && !endedAt ? 'secondary' : 'primary');
      if (message) {
        toast({
          type: 'error',
          description: message,
        });
      }
      return;
    }

    const focusErrorMessage = fieldErrors.focus?.message;

    if (focusErrorMessage) {
      triggerFocusFeedback();
      toast({
        type: 'error',
        description: focusErrorMessage,
      });
      return;
    }

    const reviewTagsErrorMessage = fieldErrors.placeTags?.message;

    if (reviewTagsErrorMessage) {
      triggerReviewTagsFeedback();
      toast({
        type: 'error',
        description: reviewTagsErrorMessage,
      });
    }
  };

  return (
    <form
      className="bg-semantic-bg-standard"
      noValidate
      onSubmit={handleSubmit(
        (values) => createLogMutation.mutate(values),
        handleInvalidSubmit,
      )}
    >
      <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <div ref={photoFieldRef}>
          <Field label="사진 등록" required>
            <PhotoUploader
              photos={photos}
              uploadButtonRef={photoUploadButtonRef}
              onAdd={(files) => {
                handleAddPhotos(files);
              }}
              onRemove={(id) => {
                handleRemovePhoto(id);
              }}
              onFileSizeExceeded={() => {
                toast({
                  type: 'error',
                  description: '10MB 이하의 이미지 파일만 등록 가능해요.',
                });
              }}
            />
          </Field>
        </div>
        <div ref={titleFieldRef}>
          <Field label="제목" required error={errors.title?.message}>
            <Input
              {...titleField}
              ref={(element) => {
                titleField.ref(element);
                titleInputRef(element);
              }}
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
        </div>
        <div ref={contentsFieldRef}>
          <Field
            label="환경 기록을 작성해 주세요"
            required
            error={errors.contents?.message}
          >
            <Textarea
              {...contentsField}
              ref={(element) => {
                contentsField.ref(element);
                contentsInputRef(element);
              }}
              onChange={(event) => {
                contentsField.onChange(event);
              }}
              placeholder={`자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.`}
              maxLength={300}
              className="[&_textarea]:body-sm"
            />
          </Field>
        </div>
      </section>
      <SectionDivider />
      <section className="flex flex-col gap-6 px-6 py-6">
        <div className="flex flex-col gap-3">
          <div ref={placeFieldRef}>
            <Field label="작업 장소" required>
              <Input
                ref={placeInputRef}
                value={place?.name ?? ''}
                placeholder="위치를 입력해 주세요."
                readOnly
                onClear={handleClearPlaceName}
                onClick={() => router.push('/log/place-search')}
              />
            </Field>
          </div>
          <div ref={placeCategoryFieldRef}>
            <Field>
              <PlaceCategorySheet
                value={placeCategory}
                onChange={(value) => {
                  setFormValue('categoryCode', value);
                }}
              >
                <SelectTriggerButton
                  ref={placeCategoryButtonRef}
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
        </div>
        <div className="flex flex-col gap-3">
          <div ref={workDateFieldRef}>
            <Field label="작업 날짜" required>
              <WorkDateDialog
                value={workDate}
                onChange={(value) => {
                  setFormValue('studyDate', value);
                }}
              >
                <SelectTriggerButton
                  ref={workDateButtonRef}
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
          </div>
          <div ref={workTimeFieldRef} className="grid grid-cols-2 gap-4">
            <Field label="시작 시간" required>
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
                  ref={startTimeButtonRef}
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
            <Field label="종료 시간" required>
              <WorkTimeDialog
                value={endTime}
                onChange={(value) => {
                  setFormValue('endedAt', value);
                }}
                label="종료 시간"
                name="endTime"
              >
                <SelectTriggerButton
                  ref={endTimeButtonRef}
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
        <div ref={focusFieldRef} className="flex flex-col gap-4">
          <Field label="집중도를 평가해 주세요" required>
            <RatingPicker
              value={focusScore}
              firstButtonRef={focusFirstButtonRef}
              onChange={(value) => {
                setFormValue('focus', value);
              }}
            />
          </Field>
        </div>
        <div
          ref={reviewTagsFieldRef}
          className="flex flex-col gap-4 border-b border-semantic-stroke-subtler pb-6"
        >
          <Field label="후기 요약 태그를 선택해 주세요" required>
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
                ref={reviewTagsButtonRef}
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
            onCheckedChange={(value) =>
              setFormValue('scope', value ? 'PUBLIC' : 'PRIVATE')
            }
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
