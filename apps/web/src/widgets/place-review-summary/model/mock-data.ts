import {
  REVIEW_ENVIRONMENT_LABELS,
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import { getTopReviewMetric, PLACE_REVIEW_METRIC_ORDER } from '../lib/utils';
import { type PlaceReviewLists, type PlaceReviewMetricType } from './types';

type MockReviewDistribution = {
  counts: Record<ReviewEnvironmentScore, number>;
  previousTopScore?: ReviewEnvironmentScore;
};

const mockReviewDistributions: Record<
  PlaceReviewMetricType,
  MockReviewDistribution
> = {
  spaceSize: {
    counts: {
      5: 23123,
      4: 1024,
      3: 61,
      2: 21,
      1: 8,
    },
  },
  noiseLevel: {
    counts: {
      5: 36,
      4: 51,
      3: 118,
      2: 520,
      1: 6,
    },
    previousTopScore: 4,
  },
  congestionLevel: {
    counts: {
      5: 860,
      4: 243,
      3: 77,
      2: 16,
      1: 4,
    },
  },
  focusLevel: {
    counts: {
      5: 232,
      4: 221,
      3: 701,
      2: 38,
      1: 8,
    },
  },
};

function createEnvironmentSummaries(
  values: Record<ReviewEnvironmentName, ReviewEnvironmentScore>,
) {
  return PLACE_REVIEW_METRIC_ORDER.map((type) => ({
    type,
    score: values[type],
    label: REVIEW_ENVIRONMENT_LABELS[type][values[type]],
  }));
}

export const mockPlaceReviewSummary: PlaceReviewLists = {
  totalCount: 1200,
  averageRating: 4.27,
  ratingParticipantCount: 1200,
  items: PLACE_REVIEW_METRIC_ORDER.map((type) => {
    const distribution = mockReviewDistributions[type];

    return getTopReviewMetric(
      type,
      distribution.counts,
      distribution.previousTopScore,
    );
  }),
  reviewLists: [
    {
      memberKey: 'member-haru',
      nickname: '하루',
      profileImageUrl: '/transparent.png',
      rating: 5,
      createdAt: '2026-05-22',
      content:
        '좌석 간격이 넓고 콘센트가 가까워서 오래 작업하기 좋았어요. 오후에도 생각보다 조용했습니다.',
      environmentSummaries: createEnvironmentSummaries({
        spaceSize: 5,
        noiseLevel: 4,
        congestionLevel: 4,
        focusLevel: 5,
      }),
      images: ['/og-image.jpg', '/transparent.png', '/og-image.jpg'],
    },
    {
      memberKey: 'member-nao',
      nickname: '나오',
      profileImageUrl: '/transparent.png',
      rating: 4,
      createdAt: '2026-05-21',
      content:
        '창가 자리는 밝고 쾌적했는데 점심시간 이후에는 사람이 조금 몰렸어요. 짧게 집중하기에는 괜찮았습니다.',
      environmentSummaries: createEnvironmentSummaries({
        spaceSize: 4,
        noiseLevel: 3,
        congestionLevel: 2,
        focusLevel: 4,
      }),
      images: [],
    },
    {
      memberKey: 'member-logi',
      nickname: '로기',
      profileImageUrl: '/transparent.png',
      rating: 5,
      createdAt: '2026-05-20',
      content:
        '음악 소리가 크지 않고 테이블 높이가 편해서 노트북 작업하기 좋았습니다. 다음에도 다시 갈 것 같아요.',
      environmentSummaries: createEnvironmentSummaries({
        spaceSize: 4,
        noiseLevel: 5,
        congestionLevel: 4,
        focusLevel: 5,
      }),
      images: [
        '/og-image.jpg',
        '/transparent.png',
        '/og-image.jpg',
        '/transparent.png',
      ],
    },
    {
      memberKey: 'member-tori',
      nickname: '토리',
      profileImageUrl: '/transparent.png',
      rating: 3,
      createdAt: '2026-05-18',
      content:
        '공간은 예쁜데 사람이 많을 때는 집중도가 조금 떨어졌어요. 오전 시간대에 가면 더 좋을 것 같습니다.',
      environmentSummaries: createEnvironmentSummaries({
        spaceSize: 3,
        noiseLevel: 2,
        congestionLevel: 2,
        focusLevel: 3,
      }),
      images: [],
    },
    {
      memberKey: 'member-seungmin',
      nickname: '승민',
      profileImageUrl: '/transparent.png',
      rating: 2,
      createdAt: '2026-05-20',
      content: '',
      environmentSummaries: createEnvironmentSummaries({
        spaceSize: 4,
        noiseLevel: 5,
        congestionLevel: 4,
        focusLevel: 5,
      }),
      images: [],
    },
  ],
};
