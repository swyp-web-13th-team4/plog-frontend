export type RecentPlace = {
  id: string;
  placeName: string;
  searchedDate: string;
};

const RECENT_PLACES_STORAGE_KEY = 'plog:recent-places';
const MAX_RECENT_PLACE_COUNT = 10;

function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
}

function isRecentPlace(value: unknown): value is RecentPlace {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.placeName === 'string' &&
    typeof candidate.searchedDate === 'string'
  );
}

function canUseLocalStorage() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

export function getRecentPlaces(): RecentPlace[] {
  if (!canUseLocalStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(RECENT_PLACES_STORAGE_KEY);
    if (!rawValue) return [];

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(isRecentPlace);
  } catch {
    return [];
  }
}

export function setRecentPlaces(places: RecentPlace[]) {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(
      RECENT_PLACES_STORAGE_KEY,
      JSON.stringify(places.slice(0, MAX_RECENT_PLACE_COUNT)),
    );
  } catch {
    // localStorage can fail in private mode or when storage quota is exceeded.
  }
}

export function addRecentPlace(place: Pick<RecentPlace, 'id' | 'placeName'>) {
  const nextPlace: RecentPlace = {
    ...place,
    searchedDate: getTodayDateKey(),
  };

  const nextPlaces = [
    nextPlace,
    ...getRecentPlaces().filter(
      (recentPlace) =>
        recentPlace.id !== nextPlace.id &&
        recentPlace.placeName !== nextPlace.placeName,
    ),
  ].slice(0, MAX_RECENT_PLACE_COUNT);

  setRecentPlaces(nextPlaces);

  return nextPlaces;
}

export function removeRecentPlace(id: string) {
  const nextPlaces = getRecentPlaces().filter((place) => place.id !== id);
  setRecentPlaces(nextPlaces);

  return nextPlaces;
}

export function clearRecentPlaces() {
  setRecentPlaces([]);

  return [];
}

export function formatRecentPlaceDate(dateKey: string) {
  const [year, month, date] = dateKey.split('-');
  if (!year || !month || !date) return dateKey;

  return `${month}.${date}`;
}
