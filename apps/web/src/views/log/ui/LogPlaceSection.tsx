import { type LogFocusTargets } from '../model/use-invalid-form-focus';
import LogPlaceCategoryField from './field/LogPlaceCategoryField';
import LogPlaceField from './field/LogPlaceField';

type LogPlaceSectionProps = {
  focusTargets: Pick<
    LogFocusTargets,
    | 'placeCategoryButtonRef'
    | 'placeCategoryFieldRef'
    | 'placeFieldRef'
    | 'placeInputRef'
  >;
  onOpenPlaceSearch: () => void;
};

export default function LogPlaceSection({
  focusTargets,
  onOpenPlaceSearch,
}: LogPlaceSectionProps) {
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
        onOpenPlaceSearch={onOpenPlaceSearch}
      />
      <LogPlaceCategoryField
        fieldRef={placeCategoryFieldRef}
        buttonRef={placeCategoryButtonRef}
      />
    </div>
  );
}
