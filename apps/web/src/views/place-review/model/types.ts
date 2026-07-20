export type ReviewSummaryStat = {
  environmentName: string;
  title: string;
  iconName: string;
  score: number;
  label: string;
};

export type ReviewSortType = 'LATEST' | 'OLDEST' | 'RATING_HIGH' | 'RATING_LOW';

export type EnvironmentName =
  | 'spaceSize'
  | 'noiseLevel'
  | 'congestionLevel'
  | 'focusLevel';

export type EnvironmentIconName =
  | 'company-filled'
  | 'megaphone-filled'
  | 'smile-filled'
  | 'fire-filled';
