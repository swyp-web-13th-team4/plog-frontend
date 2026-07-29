import { type LogFocusTargets } from '../model/use-invalid-form-focus';
import LogPlaceCategoryField from './field/LogPlaceCategoryField';
import LogPlaceField from './field/LogPlaceField';

type LogPlaceFieldsProps = {
  focusTargets: Pick<
    LogFocusTargets,
    | 'placeCategoryButtonRef'
    | 'placeCategoryFieldRef'
    | 'placeFieldRef'
    | 'placeInputRef'
  >;
  opOpenPlaceSearch: () => void;
};

export default function LogPlaceSection({
  focusTargets,
  opOpenPlaceSearch,
}: LogPlaceFieldsProps) {
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
        onOpenPlaceSearch={opOpenPlaceSearch}
      />
      <LogPlaceCategoryField
        fieldRef={placeCategoryFieldRef}
        buttonRef={placeCategoryButtonRef}
      />
    </div>
  );
}
