'use client';

import { type Ref, useMemo, useState } from 'react';

import { BottomSheet, Button, Chip, Icon, useToast } from '@plog/ui';
import { cn } from '@plog/utils';

import { PlaceTagValue } from '@/entities/place';
import {
  PLACE_TAG_LABELS,
  TAG_CATEGORIES,
} from '@/entities/place/model/place-tag';

type ReviewTagsSelectBottomSheetProps = {
  value: PlaceTagValue[];
  onChange: (value: PlaceTagValue[]) => void;
  name?: string;
  triggerRef?: Ref<HTMLButtonElement>;
};

const MAX_REVIEW_TAG_COUNT = 5;

function toggleTag(tags: PlaceTagValue[], tag: PlaceTagValue) {
  if (tags.includes(tag)) {
    return tags.filter((selectedTag) => selectedTag !== tag);
  }

  return [...tags, tag];
}

export default function ReviewTagsSelectBottomSheet({
  value,
  onChange,
  name = 'reviewTags',
  triggerRef,
}: ReviewTagsSelectBottomSheetProps) {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<PlaceTagValue[]>(value);
  const [activeCategoryTitle, setActiveCategoryTitle] = useState(
    TAG_CATEGORIES[0].title,
  );
  const { toast } = useToast();

  const selectedTagSet = useMemo(() => new Set(draftValue), [draftValue]);
  const activeCategory =
    TAG_CATEGORIES.find(({ title }) => title === activeCategoryTitle) ??
    TAG_CATEGORIES[0];
  const hasSelectedTags = value.length > 0;

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftValue(value);
    }

    setOpen(nextOpen);
  };

  const handleConfirm = () => {
    onChange(draftValue);
    setOpen(false);
  };

  const handleToggleDraftTag = (tag: PlaceTagValue) => {
    if (!selectedTagSet.has(tag) && draftValue.length >= MAX_REVIEW_TAG_COUNT) {
      toast({
        id: 'review-tags-max-count',
        type: 'error',
        description: '후기 태그는 최대 5개까지 선택할 수 있어요.',
      });

      return;
    }

    setDraftValue((current) => toggleTag(current, tag));
  };

  const handleRemoveSelectedTag = (tag: PlaceTagValue) => {
    onChange(value.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    <>
      {value.map((tag) => (
        <input key={tag} type="hidden" name={name} value={tag} />
      ))}
      {hasSelectedTags && (
        <div className="mb-4 flex flex-wrap gap-2">
          {value.map((tag) => (
            <Chip
              key={tag}
              size="small"
              variant="soft"
              pressed={selectedTagSet.has(tag)}
              className="[&>svg]:size-2.5"
              onClick={() => handleToggleDraftTag(tag)}
            >
              {PLACE_TAG_LABELS[tag]}
              <Icon name="close" boxed={false} />
            </Chip>
          ))}
        </div>
      )}
      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <BottomSheet.Trigger
          render={
            <Button
              ref={triggerRef}
              variant="outline"
              size="large"
              fullWidth
              iconLeft={<Icon name="plus" />}
              className="text-semantic-object-normal [&>svg]:size-4!"
            >
              태그 추가하기
            </Button>
          }
        />

        <BottomSheet.Content className="max-w-layout gap-4 rounded-t-[20px] px-6 pt-5 pb-6">
          <div className="flex w-full flex-col items-center gap-3">
            <BottomSheet.Handle />
            <BottomSheet.Header className="items-center">
              <BottomSheet.Title>후기 요약 태그</BottomSheet.Title>
              <BottomSheet.CloseButton />
            </BottomSheet.Header>
          </div>

          <div
            role="tablist"
            aria-label="후기 요약 태그 카테고리"
            className="flex w-full justify-between"
          >
            {TAG_CATEGORIES.map(({ title }) => {
              const selected = title === activeCategoryTitle;

              return (
                <button
                  key={title}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    'label-lg flex shrink-0',
                    selected
                      ? 'text-semantic-object-bold'
                      : 'text-semantic-object-subtle',
                  )}
                  onClick={() => setActiveCategoryTitle(title)}
                >
                  {title}
                </button>
              );
            })}
          </div>

          <BottomSheet.Body className="flex min-h-55 flex-1 flex-col">
            <div className="flex flex-wrap gap-2">
              {activeCategory.tags.map((tag) => (
                <Chip
                  key={tag}
                  size="small"
                  variant="solid"
                  pressed={selectedTagSet.has(tag)}
                  onPressedChange={() => handleToggleDraftTag(tag)}
                >
                  {PLACE_TAG_LABELS[tag]}
                </Chip>
              ))}
            </div>
          </BottomSheet.Body>

          {draftValue.length > 0 && (
            <div className="flex w-full flex-wrap gap-2">
              {draftValue.map((tag) => (
                <Chip
                  key={tag}
                  size="small"
                  variant="soft"
                  pressed={selectedTagSet.has(tag)}
                  className="[&>svg]:size-2.5"
                  onClick={() => handleToggleDraftTag(tag)}
                >
                  {PLACE_TAG_LABELS[tag]}
                  <Icon name="close" size={9} boxed={false} />
                </Chip>
              ))}
            </div>
          )}

          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="large"
              fullWidth
              disabled={draftValue.length === 0}
              onClick={() => setDraftValue([])}
            >
              초기화
            </Button>
            <Button size="large" fullWidth onClick={handleConfirm}>
              완료
            </Button>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
}
