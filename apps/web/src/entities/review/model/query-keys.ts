import { ReviewPlaceType, ReviewSortType } from './types';

export const reviewQueryKeys = {
  all: ['reviews'] as const,
  lists: () => ['reviews', 'list'] as const,
  edit: (reviewId: number | null) => ['reviews', 'edit', reviewId] as const,
  place: ({
    placeId,
    imageOnly,
    sortType,
    placeType,
  }: {
    placeId: number;
    imageOnly: boolean;
    sortType: ReviewSortType;
    placeType: ReviewPlaceType;
  }) =>
    ['reviews', 'list', placeType, placeId, { sortType, imageOnly }] as const,
};
