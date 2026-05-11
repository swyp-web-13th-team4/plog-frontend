import PlaceResultItem from './PlaceResultItem';

type PlaceSearchResultListProps = {
  places: kakao.maps.services.PlacesSearchResultItem[];
  query: string;
  onSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
};

export default function PlaceSearchResultList({
  places,
  query,
  onSelect,
}: PlaceSearchResultListProps) {
  return (
    <ul className="bg-semantic-bg-standard">
      {places.map((place) => (
        <PlaceResultItem
          key={place.id}
          place={place}
          query={query}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
