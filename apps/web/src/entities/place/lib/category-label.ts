import { PLACE_CATEGORIES } from '../model/place-category';

export function getCategoryLabel(value: string): string {
  return PLACE_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
