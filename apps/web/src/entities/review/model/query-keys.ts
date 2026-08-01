import { ReviewSortType } from './types';

export const reviewQueryKeys = {
  all: ['reviews'] as const,
  lists: () => ['reviews', 'list'] as const,
  edit: (reviewId: number | null) => ['reviews', 'edit', reviewId] as const,
  place: ({
    placeId,
    imageOnly,
    sortType,
  }: {
    placeId: number;
    imageOnly: boolean;
    sortType: ReviewSortType;
  }) => ['reviews', 'list', placeId, { sortType, imageOnly }] as const,
};
