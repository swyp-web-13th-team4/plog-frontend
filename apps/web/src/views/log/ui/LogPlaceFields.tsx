import { Field, Icon, Input } from '@plog/ui';

import { PlaceCategorySheet } from '@/features/select-place-category';

import { PLACE_CATEGORIES } from '@/entities/place';

import { type LogFormController } from '../model/use-create-log-page';
import SelectTriggerButton from './SelectTriggerButton';

type LogPlaceFieldsProps = {
  controller: LogFormController;
};

export default function LogPlaceFields({ controller }: LogPlaceFieldsProps) {
  const {
    handleClearPlaceName,
    handleOpenPlaceSearch,
    place,
    placeCategory,
    focusTargets,
    setFormValue,
  } = controller;
  const {
    placeCategoryButtonRef,
    placeCategoryFieldRef,
    placeFieldRef,
    placeInputRef,
  } = focusTargets;

  return (
    <div className="flex flex-col gap-3">
      <div ref={placeFieldRef}>
        <Field label="작업 장소" required>
          <Input
            ref={placeInputRef}
            value={place?.name ?? ''}
            placeholder="위치를 입력해 주세요."
            readOnly
            onClear={handleClearPlaceName}
            onClick={handleOpenPlaceSearch}
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
  );
}
