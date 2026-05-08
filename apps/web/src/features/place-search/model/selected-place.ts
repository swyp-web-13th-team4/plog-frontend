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
