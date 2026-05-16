export type ReviewEnvironmentName =
  | 'spaceSize'
  | 'noiseLevel'
  | 'congestionLevel'
  | 'focusLevel';

export type ReviewEnvironmentScore = 1 | 2 | 3 | 4 | 5;

export const REVIEW_ENVIRONMENT_SCORES: ReviewEnvironmentScore[] = [
  5, 4, 3, 2, 1,
] as const;

export const REVIEW_ENVIRONMENT_LABELS: Record<
  ReviewEnvironmentName,
  Record<ReviewEnvironmentScore, string>
> = {
  spaceSize: {
    5: '매우 넓어요',
    4: '넓은 편이에요',
    3: '보통이에요',
    2: '좁은 편이에요',
    1: '매우 좁아요',
  },
  noiseLevel: {
    5: '매우 조용해요',
    4: '조용한 편이에요',
    3: '보통이에요',
    2: '시끄러운 편이에요',
    1: '매우 시끄러워요',
  },
  congestionLevel: {
    5: '여유로워요',
    4: '여유 있는 편이에요',
    3: '보통이에요',
    2: '붐비는 편이에요',
    1: '매우 붐벼요',
  },
  focusLevel: {
    5: '매우 잘 돼요',
    4: '잘 되는 편이에요',
    3: '보통이에요',
    2: '잘 안 돼요',
    1: '전혀 안 돼요',
  },
};
