import {
  AtmosphereAndFocus,
  EnvironmentAndComfort,
  OtherTags,
  type PlaceTagValue,
  SeatingAndSpace,
  WorkConvenience,
} from '@/entities/place';

const PLACE_TAG_SENTENCE_LABELS: Record<PlaceTagValue, string> = {
  // 집중/분위기
  [AtmosphereAndFocus.GOOD_VIBE]: '분위기 좋은',
  [AtmosphereAndFocus.NOISY]: '시끌벅적한',
  [AtmosphereAndFocus.QUIET]: '조용한',
  [AtmosphereAndFocus.WHITE_NOISE]: '백색소음이 있는',
  [AtmosphereAndFocus.CALM]: '차분한',
  [AtmosphereAndFocus.IMMERSIVE]: '몰입감 있는',
  [AtmosphereAndFocus.DISTRACTING]: '산만한',
  [AtmosphereAndFocus.CROWDED]: '사람이 많은',
  [AtmosphereAndFocus.GOOD_FOR_FOCUS]: '집중이 잘 되는',
  [AtmosphereAndFocus.BAD_FOR_FOCUS]: '집중이 안 되는',
  [AtmosphereAndFocus.PEACEFUL]: '한적한',
  [AtmosphereAndFocus.TRANQUIL]: '잔잔한',
  [AtmosphereAndFocus.SCENIC]: '운치 있는',
  [AtmosphereAndFocus.COZY]: '아늑한',
  [AtmosphereAndFocus.MODERATE_NOISE]: '적당한 소음의',

  // 작업 편의성
  [WorkConvenience.FAST_WIFI]: '와이파이가 빠른',
  [WorkConvenience.UNSTABLE_WIFI]: '와이파이가 불안정한',
  [WorkConvenience.NO_WIFI]: '와이파이가 없는',
  [WorkConvenience.PRINTING_AVAILABLE]: '프린트가 가능한',
  [WorkConvenience.MANY_OUTLETS]: '콘센트가 많은',
  [WorkConvenience.NO_OUTLETS]: '콘센트가 없는',
  [WorkConvenience.CHARGING_AVAILABLE]: '충전이 가능한',
  [WorkConvenience.NO_CHARGING]: '충전이 불가한',
  [WorkConvenience.LAPTOP_FRIENDLY]: '노트북 사용이 가능한',
  [WorkConvenience.NO_LAPTOPS]: '노트북 사용이 불가한',
  [WorkConvenience.LONG_WORK]: '장시간 작업이 가능한',
  [WorkConvenience.SHORT_WORK]: '단시간 작업에 적합한',

  // 좌석/공간
  [SeatingAndSpace.COMFORTABLE_SEATS]: '좌석이 편한',
  [SeatingAndSpace.UNCOMFORTABLE_SEATS]: '좌석이 불편한',
  [SeatingAndSpace.WINDOW_SEATS]: '창가 자리가 있는',
  [SeatingAndSpace.MANY_SEATS]: '좌석이 많은',
  [SeatingAndSpace.FEW_SEATS]: '좌석이 적은',
  [SeatingAndSpace.WIDE_SEAT_SPACING]: '좌석 간격이 넓은',
  [SeatingAndSpace.NARROW_SEAT_SPACING]: '좌석 간격이 좁은',
  [SeatingAndSpace.LARGE_TABLES]: '테이블이 넓은',
  [SeatingAndSpace.SMALL_TABLES]: '테이블이 좁은',
  [SeatingAndSpace.SINGLE_SEATS]: '1인석이 있는',
  [SeatingAndSpace.EIGHT_PERSON_SEATS]: '8인석이 있는',
  [SeatingAndSpace.SPACIOUS]: '공간이 넓은',
  [SeatingAndSpace.NARROW_SPACE]: '공간이 좁은',
  [SeatingAndSpace.CONVENIENT_LAYOUT]: '동선이 편한',

  // 환경/쾌적성
  [EnvironmentAndComfort.WARM]: '따뜻한',
  [EnvironmentAndComfort.COOL]: '시원한',
  [EnvironmentAndComfort.GOOD_TEMPERATURE]: '온도가 적절한',
  [EnvironmentAndComfort.CLEAN]: '청결한',
  [EnvironmentAndComfort.MESSY]: '지저분한',
  [EnvironmentAndComfort.GOOD_VENTILATION]: '환기가 잘 되는',
  [EnvironmentAndComfort.BAD_VENTILATION]: '환기가 안 되는',
  [EnvironmentAndComfort.BRIGHT_LIGHTING]: '조명이 밝은',
  [EnvironmentAndComfort.DARK_LIGHTING]: '조명이 어두운',
  [EnvironmentAndComfort.GOOD_SUNLIGHT]: '채광이 좋은',
  [EnvironmentAndComfort.PLEASANT]: '쾌적한',
  [EnvironmentAndComfort.STUFFY]: '답답한',

  // 기타
  [OtherTags.PARKING_AVAILABLE]: '주차가 가능한',
  [OtherTags.NO_PARKING]: '주차가 불가한',
  [OtherTags.MEETING_ROOM]: '회의가 가능한',
  [OtherTags.CONVERSATION_FRIENDLY]: '대화가 가능한',
  [OtherTags.OVERNIGHT_WORK]: '밤샘 작업이 가능한',
};

export type SentenceResult = { sentence: string; highlight: string };

function getTagLabel(tag: string): string {
  return PLACE_TAG_SENTENCE_LABELS[tag.toUpperCase() as PlaceTagValue] ?? tag;
}

export function getTimeSentence(
  period: string,
  avgFocus: number,
): SentenceResult {
  const highlight = `${period} 시간대`;

  if (avgFocus >= 4) {
    return {
      sentence: `주로 ${highlight}에 작업할 때 가장 높은 몰입도를 보여요.`,
      highlight,
    };
  }
  if (avgFocus >= 3) {
    return {
      sentence: `${highlight}에는 대체로 안정적인 흐름으로 작업해요.`,
      highlight,
    };
  }
  return {
    sentence: `${highlight}에는 몰입을 이어가기가 어려운 편이에요.`,
    highlight,
  };
}

export function getBestTagSentence(
  tag: string,
  avgFocus: number,
): SentenceResult {
  const label = getTagLabel(tag);

  if (avgFocus >= 4) {
    return {
      sentence: `주로 ${label} 환경에서 높은 집중력을 유지하고 있어요.`,
      highlight: label,
    };
  }
  if (avgFocus >= 3) {
    return {
      sentence: `${label} 환경에서 기복 없이 평소의 페이스를 유지해요.`,
      highlight: label,
    };
  }
  return {
    sentence: `더 나은 환경을 찾기 위해 기록해 보세요.`,
    highlight: '',
  };
}

export function getWorstTagSentence(
  tag: string,
  avgFocus: number,
): SentenceResult {
  const label = getTagLabel(tag);

  if (avgFocus >= 3) {
    return {
      sentence: `${label} 환경에서도 큰 영향 없이 일정한 몰입도를 보여요.`,
      highlight: label,
    };
  }
  return {
    sentence: `${label} 환경에서는 집중이 쉽게 흐트러지는 경향이 있어요.`,
    highlight: label,
  };
}
