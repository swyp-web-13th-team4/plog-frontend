import { type LogFormController } from '../model/use-create-log-page';
import LogPlaceCategoryField from './field/LogPlaceCategoryField';
import LogPlaceField from './field/LogPlaceField';

type LogPlaceFieldsProps = {
  controller: LogFormController;
};

export default function LogPlaceSection({ controller }: LogPlaceFieldsProps) {
  const { handleOpenPlaceSearch, focusTargets } = controller;
  const {
    placeCategoryButtonRef,
    placeCategoryFieldRef,
    placeFieldRef,
    placeInputRef,
  } = focusTargets;

  return (
    <div className="flex flex-col gap-3">
      <LogPlaceField
        fieldRef={placeFieldRef}
        inputRef={placeInputRef}
        onOpenPlaceSearch={handleOpenPlaceSearch}
      />
      <LogPlaceCategoryField
        fieldRef={placeCategoryFieldRef}
        buttonRef={placeCategoryButtonRef}
      />
    </div>
  );
}
