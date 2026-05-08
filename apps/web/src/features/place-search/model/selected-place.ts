export type SelectedPlace = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

function getDisplayAddress(place: kakao.maps.services.PlacesSearchResultItem) {
  return place.road_address_name || place.address_name;
}

export function createSelectedPlace(
  place: kakao.maps.services.PlacesSearchResultItem,
): SelectedPlace {
  return {
    id: place.id,
    name: place.place_name,
    address: getDisplayAddress(place),
    latitude: Number(place.y),
    longitude: Number(place.x),
  };
}

export function buildSelectedPlaceSearchParams(place: SelectedPlace) {
  return new URLSearchParams({
    placeId: place.id,
    placeName: place.name,
    placeAddress: place.address,
    placeLatitude: String(place.latitude),
    placeLongitude: String(place.longitude),
  });
}

export function parseSelectedPlaceSearchParams(params: {
  placeId?: string;
  placeName?: string;
  placeAddress?: string;
  placeLatitude?: string;
  placeLongitude?: string;
}): SelectedPlace | null {
  const { placeId, placeName, placeAddress, placeLatitude, placeLongitude } =
    params;

  if (
    !placeId ||
    !placeName ||
    !placeAddress ||
    !placeLatitude ||
    !placeLongitude
  ) {
    return null;
  }

  const latitude = Number(placeLatitude);
  const longitude = Number(placeLongitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    id: placeId,
    name: placeName,
    address: placeAddress,
    latitude,
    longitude,
  };
}
