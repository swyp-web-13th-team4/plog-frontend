import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getPlaceReviews,
  reviewQueryKeys,
  ReviewSortType,
} from '@/entities/review';

type PlaceReviewQueryProps = {
  placeId: number;
  imageOnly: boolean;
  sortType: ReviewSortType;
};

const LIMIT = 20;

export function usePlaceReviewsQuery({
  placeId,
  imageOnly,
  sortType,
}: PlaceReviewQueryProps) {
  return useInfiniteQuery({
    queryKey: reviewQueryKeys.place({
      placeId,
      sortType,
      imageOnly,
    }),

    queryFn: ({ pageParam }) =>
      getPlaceReviews({
        placeId,
        cursor: pageParam,
        limit: LIMIT,
        sortType,
        imageOnly,
      }),

    initialPageParam: '',

    getNextPageParam: (lastPage) => {
      if (!lastPage.reviews.hasNext) {
        return undefined;
      }

      return lastPage.reviews.nextCursor ?? undefined;
    },

    enabled: placeId > 0 && Number.isInteger(placeId),
  });
}
