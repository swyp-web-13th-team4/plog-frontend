import { useCallback } from 'react';

import { Field, Textarea } from '@plog/ui';

import { PhotoUploader, usePhotoUploadFeedback } from '@/features/photo-upload';

import { type LogFormController } from '../model/use-create-log-page';
import LogTitleField from './LogTitleField';

type LogBasicSectionProps = {
  controller: LogFormController;
};

export default function LogBasicSection({ controller }: LogBasicSectionProps) {
  const {
    contents,
    contentsField,
    handleAddPhotos,
    handleRemovePhoto,
    photos,
    focusTargets,
    setFormValue,
  } = controller;
  const {
    contentsFieldRef,
    contentsInputRef,
    photoFieldRef,
    photoUploadButtonRef,
    titleFieldRef,
    titleInputRef,
  } = focusTargets;
  const { ref: contentsFormRef } = contentsField;

  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

  const setContentsRef = useCallback(
    (element: HTMLTextAreaElement | null) => {
      contentsFormRef(element);
      contentsInputRef(element);
    },
    [contentsFormRef, contentsInputRef],
  );

  return (
    <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
      <div ref={photoFieldRef}>
        <Field label="사진 등록" required>
          <PhotoUploader
            photos={photos}
            uploadButtonRef={photoUploadButtonRef}
            onAdd={handleAddPhotos}
            onRemove={handleRemovePhoto}
            onFileSizeExceeded={handlePhotoFileSizeExceeded}
            onMaxCountExceeded={handlePhotoMaxCountExceeded}
            onConversionFailed={handlePhotoConversionFailed}
          />
        </Field>
      </div>

      <LogTitleField fieldRef={titleFieldRef} inputRef={titleInputRef} />

      <div ref={contentsFieldRef}>
        <Field
          label="환경 기록을 작성해 주세요"
          required
          // error={errors.contents?.message}
        >
          <Textarea
            {...contentsField}
            ref={setContentsRef}
            onChange={contentsField.onChange}
            onBlur={() => setFormValue('contents', (contents ?? '').trim())}
            value={(contents ?? '').trimStart()}
            placeholder={`자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.`}
            maxLength={300}
            className="[&_textarea]:body-sm"
          />
        </Field>
      </div>
    </section>
  );
}
