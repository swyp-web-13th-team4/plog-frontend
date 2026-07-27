import { type LogFormController } from '../model/use-create-log-page';
import LogContentsField from './LogContentsField';
import LogPhotoField from './LogPhotoField';
import LogTitleField from './LogTitleField';

type LogBasicSectionProps = {
  controller: LogFormController;
};

export default function LogBasicSection({ controller }: LogBasicSectionProps) {
  const { focusTargets } = controller;
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
