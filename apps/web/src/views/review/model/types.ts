import { type IconName } from '@plog/ui';

export const REVIEW_PLACE_IMAGE_SRC = '/review-place-preview.png';
export const DEFAULT_REVIEW_PLACE_NAME = '방문 장소';

export type ReviewEnvironmentName =
  | 'spaceSize'
  | 'noiseLevel'
  | 'congestionLevel'
  | 'focusLevel';

export type ReviewEnvironmentGroup = {
  name: ReviewEnvironmentName;
  title: string;
  iconName: IconName;
  options: string[];
};
