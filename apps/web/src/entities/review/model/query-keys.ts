import { ReviewPlaceType, ReviewSortType } from './types';

export const reviewQueryKeys = {
  all: ['reviews'] as const,
  lists: () => ['reviews', 'list'] as const,
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
