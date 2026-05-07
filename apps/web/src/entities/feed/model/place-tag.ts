export enum AtmosphereAndFocus {
  GOOD_VIBE = 'GOOD_VIBE',
  NOISY = 'NOISY',
  QUIET = 'QUIET',
  WHITE_NOISE = 'WHITE_NOISE',
  CALM = 'CALM',
  IMMERSIVE = 'IMMERSIVE',
  DISTRACTING = 'DISTRACTING',
  CROWDED = 'CROWDED',
  GOOD_FOR_FOCUS = 'GOOD_FOR_FOCUS',
  BAD_FOR_FOCUS = 'BAD_FOR_FOCUS',
  PEACEFUL = 'PEACEFUL',
  TRANQUIL = 'TRANQUIL',
  SCENIC = 'SCENIC',
  COZY = 'COZY',
  MODERATE_NOISE = 'MODERATE_NOISE',
}

export enum WorkConvenience {
  FAST_WIFI = 'FAST_WIFI',
  UNSTABLE_WIFI = 'UNSTABLE_WIFI',
  NO_WIFI = 'NO_WIFI',
  PRINTING_AVAILABLE = 'PRINTING_AVAILABLE',
  MANY_OUTLETS = 'MANY_OUTLETS',
  NO_OUTLETS = 'NO_OUTLETS',
  CHARGING_AVAILABLE = 'CHARGING_AVAILABLE',
  NO_CHARGING = 'NO_CHARGING',
  LAPTOP_FRIENDLY = 'LAPTOP_FRIENDLY',
  NO_LAPTOPS = 'NO_LAPTOPS',
  LONG_WORK = 'LONG_WORK',
  SHORT_WORK = 'SHORT_WORK',
}

export enum SeatingAndSpace {
  COMFORTABLE_SEATS = 'COMFORTABLE_SEATS',
  UNCOMFORTABLE_SEATS = 'UNCOMFORTABLE_SEATS',
  WINDOW_SEATS = 'WINDOW_SEATS',
  MANY_SEATS = 'MANY_SEATS',
  FEW_SEATS = 'FEW_SEATS',
  WIDE_SEAT_SPACING = 'WIDE_SEAT_SPACING',
  NARROW_SEAT_SPACING = 'NARROW_SEAT_SPACING',
  LARGE_TABLES = 'LARGE_TABLES',
  SMALL_TABLES = 'SMALL_TABLES',
  SINGLE_SEATS = 'SINGLE_SEATS',
  EIGHT_PERSON_SEATS = 'EIGHT_PERSON_SEATS',
  SPACIOUS = 'SPACIOUS',
  NARROW_SPACE = 'NARROW_SPACE',
  CONVENIENT_LAYOUT = 'CONVENIENT_LAYOUT',
}

export enum EnvironmentAndComfort {
  WARM = 'WARM',
  COOL = 'COOL',
  GOOD_TEMPERATURE = 'GOOD_TEMPERATURE',
  CLEAN = 'CLEAN',
  MESSY = 'MESSY',
  GOOD_VENTILATION = 'GOOD_VENTILATION',
  BAD_VENTILATION = 'BAD_VENTILATION',
  BRIGHT_LIGHTING = 'BRIGHT_LIGHTING',
  DARK_LIGHTING = 'DARK_LIGHTING',
  GOOD_SUNLIGHT = 'GOOD_SUNLIGHT',
  PLEASANT = 'PLEASANT',
  STUFFY = 'STUFFY',
}

export enum OtherTags {
  PARKING_AVAILABLE = 'PARKING_AVAILABLE',
  NO_PARKING = 'NO_PARKING',
  MEETING_ROOM = 'MEETING_ROOM',
  CONVERSATION_FRIENDLY = 'CONVERSATION_FRIENDLY',
  OVERNIGHT_WORK = 'OVERNIGHT_WORK',
}

export type PlaceTagValue =
  | AtmosphereAndFocus
  | WorkConvenience
  | SeatingAndSpace
  | EnvironmentAndComfort
  | OtherTags;

export const PLACE_TAG_LABELS: Record<PlaceTagValue, string> = {
  // 집중/분위기
  [AtmosphereAndFocus.GOOD_VIBE]: '#분위기좋음',
  [AtmosphereAndFocus.NOISY]: '#시끌벅적',
  [AtmosphereAndFocus.QUIET]: '#조용한',
  [AtmosphereAndFocus.WHITE_NOISE]: '#백색소음',
  [AtmosphereAndFocus.CALM]: '#차분한',
  [AtmosphereAndFocus.IMMERSIVE]: '#몰입잘됨',
  [AtmosphereAndFocus.DISTRACTING]: '#산만함',
  [AtmosphereAndFocus.CROWDED]: '#사람많음',
  [AtmosphereAndFocus.GOOD_FOR_FOCUS]: '#집중잘됨',
  [AtmosphereAndFocus.BAD_FOR_FOCUS]: '#집중안됨',
  [AtmosphereAndFocus.PEACEFUL]: '#한적함',
  [AtmosphereAndFocus.TRANQUIL]: '#잔잔한',
  [AtmosphereAndFocus.SCENIC]: '#운치있는',
  [AtmosphereAndFocus.COZY]: '#아늑한',
  [AtmosphereAndFocus.MODERATE_NOISE]: '#적당한소음',

  // 작업 편의성
  [WorkConvenience.FAST_WIFI]: '#와이파이빠름',
  [WorkConvenience.UNSTABLE_WIFI]: '#와이파이끊김',
  [WorkConvenience.NO_WIFI]: '#와이파이없음',
  [WorkConvenience.PRINTING_AVAILABLE]: '#프린트가능',
  [WorkConvenience.MANY_OUTLETS]: '#콘센트많음',
  [WorkConvenience.NO_OUTLETS]: '#콘센트없음',
  [WorkConvenience.CHARGING_AVAILABLE]: '#충전가능',
  [WorkConvenience.NO_CHARGING]: '#충전불가능',
  [WorkConvenience.LAPTOP_FRIENDLY]: '#노트북가능',
  [WorkConvenience.NO_LAPTOPS]: '#노트북불가능',
  [WorkConvenience.LONG_WORK]: '#장시간작업',
  [WorkConvenience.SHORT_WORK]: '#단시간작업',

  // 좌석/공간
  [SeatingAndSpace.COMFORTABLE_SEATS]: '#좌석편함',
  [SeatingAndSpace.UNCOMFORTABLE_SEATS]: '#좌석불편',
  [SeatingAndSpace.WINDOW_SEATS]: '#창가자리',
  [SeatingAndSpace.MANY_SEATS]: '#좌석많음',
  [SeatingAndSpace.FEW_SEATS]: '#좌석적음',
  [SeatingAndSpace.WIDE_SEAT_SPACING]: '#좌석간격넓음',
  [SeatingAndSpace.NARROW_SEAT_SPACING]: '#좌석간격좁음',
  [SeatingAndSpace.LARGE_TABLES]: '#테이블넓음',
  [SeatingAndSpace.SMALL_TABLES]: '#테이블좁음',
  [SeatingAndSpace.SINGLE_SEATS]: '#1인석있음',
  [SeatingAndSpace.EIGHT_PERSON_SEATS]: '#8인석있음',
  [SeatingAndSpace.SPACIOUS]: '#공간넓음',
  [SeatingAndSpace.NARROW_SPACE]: '#공간좁음',
  [SeatingAndSpace.CONVENIENT_LAYOUT]: '#동선편함',

  // 환경/쾌적성
  [EnvironmentAndComfort.WARM]: '#따뜻함',
  [EnvironmentAndComfort.COOL]: '#시원함',
  [EnvironmentAndComfort.GOOD_TEMPERATURE]: '#온도적절',
  [EnvironmentAndComfort.CLEAN]: '#청결함',
  [EnvironmentAndComfort.MESSY]: '#지저분함',
  [EnvironmentAndComfort.GOOD_VENTILATION]: '#환기잘됨',
  [EnvironmentAndComfort.BAD_VENTILATION]: '#환기안됨',
  [EnvironmentAndComfort.BRIGHT_LIGHTING]: '#조명밝음',
  [EnvironmentAndComfort.DARK_LIGHTING]: '#조명어두움',
  [EnvironmentAndComfort.GOOD_SUNLIGHT]: '#채광좋음',
  [EnvironmentAndComfort.PLEASANT]: '#쾌적함',
  [EnvironmentAndComfort.STUFFY]: '#답답함',

  // 기타 항목
  [OtherTags.PARKING_AVAILABLE]: '#주차가능',
  [OtherTags.NO_PARKING]: '#주차불가능',
  [OtherTags.MEETING_ROOM]: '#회의가능',
  [OtherTags.CONVERSATION_FRIENDLY]: '#대화가능',
  [OtherTags.OVERNIGHT_WORK]: '#밤샘작업',
};

export interface TagCategory {
  title: string;
  tags: PlaceTagValue[];
}

export const TAG_CATEGORIES: TagCategory[] = [
  {
    title: '집중/분위기',
    tags: Object.values(AtmosphereAndFocus) as PlaceTagValue[],
  },
  {
    title: '작업 편의성',
    tags: Object.values(WorkConvenience) as PlaceTagValue[],
  },
  {
    title: '좌석/공간',
    tags: Object.values(SeatingAndSpace) as PlaceTagValue[],
  },
  {
    title: '환경/쾌적성',
    tags: Object.values(EnvironmentAndComfort) as PlaceTagValue[],
  },
  { title: '기타 항목', tags: Object.values(OtherTags) as PlaceTagValue[] },
];
