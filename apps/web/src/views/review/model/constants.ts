import { ReviewEnvironmentGroup } from './types';

export const REVIEW_ENVIRONMENT_GROUPS: ReviewEnvironmentGroup[] = [
  {
    name: 'spaceSize',
    title: '공간 크기',
    iconName: 'company-filled',
    options: [
      '매우 넓어요',
      '넓은 편이에요',
      '보통이에요',
      '좁은 편이에요',
      '매우 좁아요',
    ],
  },
  {
    name: 'noiseLevel',
    title: '소음 수준',
    iconName: 'megaphone-filled',
    options: [
      '매우 조용해요',
      '조용한 편이에요',
      '보통이에요',
      '시끄러운 편이에요',
      '매우 시끄러워요',
    ],
  },
  {
    name: 'congestionLevel',
    title: '혼잡도',
    iconName: 'smile-filled',
    options: [
      '여유로워요',
      '여유 있는 편이에요',
      '보통이에요',
      '붐비는 편이에요',
      '매우 붐벼요',
    ],
  },
  {
    name: 'focusLevel',
    title: '집중도',
    iconName: 'fire-filled',
    options: [
      '매우 잘 돼요',
      '잘 되는 편이에요',
      '보통이에요',
      '잘 안 돼요',
      '전혀 안 돼요',
    ],
  },
] as const;
