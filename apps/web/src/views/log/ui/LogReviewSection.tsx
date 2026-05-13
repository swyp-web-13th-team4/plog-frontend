import { Button, Chip, Field, Icon } from '@plog/ui';

import { ReviewTagsSheet } from '@/features/select-review-tags';

import { PLACE_TAG_LABELS } from '@/entities/feed';

import { type LogFormController } from '../model/use-create-log-page';
import RatingPicker from './RatingPicker';

type LogReviewSectionProps = {
  controller: LogFormController;
};

export default function LogReviewSection({
  controller,
}: LogReviewSectionProps) {
  const { focusScore, focusTargets, reviewTags, setFormValue } = controller;
  const {
    focusFieldRef,
    focusFirstButtonRef,
    reviewTagsButtonRef,
    reviewTagsFieldRef,
  } = focusTargets;

  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <div ref={focusFieldRef} className="flex flex-col gap-4">
        <Field label="집중도를 평가해 주세요" required>
          <RatingPicker
            value={focusScore}
            firstButtonRef={focusFirstButtonRef}
            onChange={(value) => {
              setFormValue('focus', value);
            }}
          />
        </Field>
      </div>
      <div
        ref={reviewTagsFieldRef}
        className="flex flex-col gap-4 border-b border-semantic-stroke-subtler pb-6"
      >
        <Field label="후기 요약 태그를 선택해 주세요" required>
          <>
            {reviewTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {reviewTags.map((tag) => (
                  <Chip
                    key={tag}
                    size="small"
                    variant="soft"
                    pressed
                    onClick={() => {
                      setFormValue(
                        'placeTags',
                        reviewTags.filter((selectedTag) => selectedTag !== tag),
                      );
                    }}
                  >
                    {PLACE_TAG_LABELS[tag]}
                    <Icon name="close" size={16} />
                  </Chip>
                ))}
              </div>
            )}
            <ReviewTagsSheet
              value={reviewTags}
              onChange={(value) => {
                setFormValue('placeTags', value);
              }}
            >
              <Button
                variant="outline"
                size="large"
                fullWidth
                ref={reviewTagsButtonRef}
                iconLeft={<Icon name="plus" />}
                className="text-semantic-object-normal [&>svg]:size-4!"
              >
                태그 추가하기
              </Button>
            </ReviewTagsSheet>
          </>
        </Field>
      </div>
    </section>
  );
}
