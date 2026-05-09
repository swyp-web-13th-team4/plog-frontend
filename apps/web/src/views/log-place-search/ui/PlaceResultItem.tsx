import HighlightText from '@/features/place-search/ui/HighlightText';

function getDisplayAddress(place: kakao.maps.services.PlacesSearchResultItem) {
  return place.road_address_name || place.address_name;
}

type PlaceResultItemProps = {
  place: kakao.maps.services.PlacesSearchResultItem;
  query: string;
  onSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
};

export default function PlaceResultItem({
  place,
  query,
  onSelect,
}: PlaceResultItemProps) {
  return (
    <li>
      <button
        type="button"
        className="w-full cursor-pointer border-b border-semantic-stroke-subtler px-6 py-5 text-left hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-semantic-accent-normal"
        onClick={() => onSelect(place)}
      >
        <p className="body-lg text-semantic-object-boldest">
          <HighlightText text={place.place_name} query={query} />
        </p>
        <p className="body-sm text-semantic-object-normal">
          {getDisplayAddress(place)}
        </p>
      </button>
    </li>
  );
}
