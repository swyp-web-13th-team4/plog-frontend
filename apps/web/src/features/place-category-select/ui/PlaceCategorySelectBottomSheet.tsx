'use client';

import { useMemo, useState } from 'react';

import { BottomSheet, Button } from '@plog/ui';
import { cn } from '@plog/utils';

import { PLACE_CATEGORIES, type PlaceCategoryValue } from '@/entities/place';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import CheckPlaceIcon from '@/shared/assets/icons/check-place.svg';

type PlaceCategorySelectProps = {
  value: PlaceCategoryValue | null;
  onChange: (value: PlaceCategoryValue) => void;
  placeholder?: string;
  name?: string;
};

const DEFAULT_PLACE_CATEGORY_VALUE = PLACE_CATEGORIES[0].value;

export default function PlaceCategorySelectBottomSheet({
  value,
  onChange,
  placeholder = '장소 카테고리를 선택해 주세요.',
  name = 'placeCategory',
}: PlaceCategorySelectProps) {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<PlaceCategoryValue>(
    value ?? DEFAULT_PLACE_CATEGORY_VALUE,
  );

  const selectedCategory = useMemo(
    () => PLACE_CATEGORIES.find((category) => category.value === value),
    [value],
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftValue(value ?? DEFAULT_PLACE_CATEGORY_VALUE);
    }
    setOpen(nextOpen);
  };

  const handleCancel = () => {
    setDraftValue(value ?? DEFAULT_PLACE_CATEGORY_VALUE);
    setOpen(false);
  };

  const handleConfirm = () => {
    onChange(draftValue);
    setOpen(false);
  };

  return (
    <>
      <input type="hidden" name={name} value={value ?? ''} />
      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <BottomSheet.Trigger
          render={
            <button
              type="button"
              className="body-md flex w-full items-center gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white px-4 py-3 text-left text-semantic-object-boldest transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle"
            >
              <span
                className={cn(
                  'min-w-0 flex-1 truncate',
                  selectedCategory
                    ? 'text-semantic-object-boldest'
                    : 'text-semantic-object-normal',
                )}
              >
                {selectedCategory?.label ?? placeholder}
              </span>
              <ArrowIcon
                aria-hidden="true"
                className="size-5 shrink-0 rotate-180 text-semantic-object-subtle"
              />
            </button>
          }
        />

        <BottomSheet.Content className="max-w-layout gap-4 rounded-t-[20px] px-6 pt-5 pb-6">
          <BottomSheet.Handle />
          <BottomSheet.Header className="items-center">
            <BottomSheet.Title className="title-sm text-semantic-object-boldest">
              장소 카테고리
            </BottomSheet.Title>
            <BottomSheet.CloseButton />
          </BottomSheet.Header>

          <BottomSheet.Body className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              {PLACE_CATEGORIES.map(({ label, value: categoryValue }) => {
                const selected = draftValue === categoryValue;

                return (
                  <button
                    key={categoryValue}
                    type="button"
                    className={cn(
                      'body-lg flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                      selected
                        ? 'border-semantic-accent-alternative bg-semantic-accent-subtlest text-semantic-accent-normal focus-visible:outline-semantic-accent-normal'
                        : 'border-semantic-stroke-subtle bg-semantic-system-white text-semantic-object-bold hover:bg-semantic-bg-deep focus-visible:outline-semantic-stroke-subtle',
                    )}
                    onClick={() => setDraftValue(categoryValue)}
                  >
                    <span className="min-w-0 flex-1 truncate">{label}</span>
                    {selected && <CheckPlaceIcon />}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="large"
                fullWidth
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button size="large" fullWidth onClick={handleConfirm}>
                완료
              </Button>
            </div>
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
}
