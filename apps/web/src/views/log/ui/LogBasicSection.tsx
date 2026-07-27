import { Field } from '@plog/ui';

import { PhotoUploader, usePhotoUploadFeedback } from '@/features/photo-upload';

import { type LogFormController } from '../model/use-create-log-page';
import LogContenetsField from './LogContentsField';
import LogTitleField from './LogTitleField';

type LogBasicSectionProps = {
  controller: LogFormController;
};

export default function LogBasicSection({ controller }: LogBasicSectionProps) {
  const { handleAddPhotos, handleRemovePhoto, photos, focusTargets } =
    controller;
  const {
    contentsFieldRef,
    contentsTextareaRef,
    photoFieldRef,
    photoUploadButtonRef,
    titleFieldRef,
    titleInputRef,
  } = focusTargets;

  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

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
      <LogContenetsField
        fieldRef={contentsFieldRef}
        textareaRef={contentsTextareaRef}
      />
    </section>
  );
}
