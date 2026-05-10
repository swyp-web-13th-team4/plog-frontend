import { type MapSortType, type PlaceLayer } from './types';

export const placeQueryKeys = {
  recent: ['place', 'recent'] as const,
};

export const mapQueryKeys = {
  all: ['map'] as const,
  count: () => ['map', 'count'] as const,
  pins: (layer: PlaceLayer, bounds: unknown, sortType: MapSortType) =>
    ['map', 'pins', layer, bounds, sortType] as const,
  pinsByLayer: (layer: PlaceLayer) => ['map', 'pins', layer] as const,
  pinDetail: (placeId: number | null, layer: PlaceLayer) =>
    ['map', 'pin-detail', placeId, layer] as const,
  pinDetailAll: () => ['map', 'pin-detail'] as const,
  sheet: (layer: PlaceLayer, sortType: MapSortType) =>
    ['map', 'sheet', layer, sortType] as const,
  sheetByLayer: (layer: PlaceLayer) => ['map', 'sheet', layer] as const,
  search: (keyword: string) => ['map', 'search', keyword] as const,
  place: (
    placeId: number,
    layer: PlaceLayer,
    sortType: MapSortType,
    tags: readonly string[],
  ) => ['map', 'place', placeId, layer, sortType, tags] as const,
  placeAll: () => ['map', 'place'] as const,
};
