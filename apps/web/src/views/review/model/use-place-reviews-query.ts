import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getPlaceReviews,
  ReviewPlaceType,
  reviewQueryKeys,
  ReviewSortType,
} from '@/entities/review';

type PlaceReviewQueryProps = {
  placeId: number;
  imageOnly: boolean;
  sortType: ReviewSortType;
  placeType: ReviewPlaceType;
};

const LIMIT = 20;

export default function usePlaceReviewsQuery({
  placeId,
  imageOnly,
  sortType,
  placeType,
}: PlaceReviewQueryProps) {
  return useInfiniteQuery({
    queryKey: reviewQueryKeys.place({
      placeId,
      placeType,
      sortType,
      imageOnly,
    }),

    queryFn: ({ pageParam }) =>
      getPlaceReviews({
        placeId,
        placeType,
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
