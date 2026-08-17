import { type CreateLogFormValues } from '../model/types';
import { type LogFocusTargets } from '../model/use-invalid-form-focus';
import LogContentsField from './field/LogContentsField';
import LogPhotoField from './field/LogPhotoField';
import LogTitleField from './field/LogTitleField';

type LogBasicSectionProps = {
  focusTargets: Pick<
    LogFocusTargets,
    | 'photoFieldRef'
    | 'photoUploadButtonRef'
    | 'contentsFieldRef'
    | 'contentsTextareaRef'
    | 'titleFieldRef'
    | 'titleInputRef'
  >;
  photos: CreateLogFormValues['photos'];
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (id: string) => void;
};

export default function LogBasicSection({
  focusTargets,
  photos,
  onAddPhotos,
  onRemovePhoto,
}: LogBasicSectionProps) {
  const {
    contentsFieldRef,
    contentsTextareaRef,
    photoFieldRef,
    photoUploadButtonRef,
    titleFieldRef,
    titleInputRef,
  } = focusTargets;

  return (
    <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
      <LogPhotoField
        photos={photos}
        onAddPhotos={onAddPhotos}
        onRemovePhoto={onRemovePhoto}
        fieldRef={photoFieldRef}
        photoUploadButtonRef={photoUploadButtonRef}
      />
      <LogTitleField fieldRef={titleFieldRef} inputRef={titleInputRef} />
      <LogContentsField
        fieldRef={contentsFieldRef}
        textareaRef={contentsTextareaRef}
      />
    </section>
  );
}
