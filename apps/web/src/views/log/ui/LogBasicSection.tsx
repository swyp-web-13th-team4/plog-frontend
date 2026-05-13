import { useCallback } from 'react';

import { Field, Input, Textarea } from '@plog/ui';

import { type LogFormController } from '../model/use-create-log-page';
import PhotoUploader from './PhotoUploader';

type LogBasicSectionProps = {
  controller: LogFormController;
};

export default function LogBasicSection({ controller }: LogBasicSectionProps) {
  const {
    contents,
    contentsField,
    errors,
    handleAddPhotos,
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handleRemovePhoto,
    photos,
    focusTargets,
    setFormValue,
    title,
    titleField,
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
  const { ref: titleFormRef } = titleField;

  const setTitleRef = useCallback(
    (element: HTMLElement | null) => {
      titleFormRef(element);
      titleInputRef(element);
    },
    [titleFormRef, titleInputRef],
  );

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
            onConversionFailed={handlePhotoConversionFailed}
          />
        </Field>
      </div>
      <div ref={titleFieldRef}>
        <Field label="제목" required error={errors.title?.message}>
          <Input
            {...titleField}
            ref={setTitleRef}
            onChange={titleField.onChange}
            onClear={() => {
              setFormValue('title', '');
            }}
            onBlur={() => setFormValue('title', (title ?? '').trim())}
            value={(title ?? '').trimStart()}
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
