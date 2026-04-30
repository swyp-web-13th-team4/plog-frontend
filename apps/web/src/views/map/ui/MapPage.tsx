'use client';

import { useMemo, useState } from 'react';

import Script from 'next/script';

import { BottomSheet, Input } from '@plog/ui';

import { MapListSheet } from '@/widgets/map-list-sheet';
import { SelectedPlaceSheet } from '@/widgets/map-selected-sheet';

import { type Place, type PlaceLayer } from '@/entities/place';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useUserLocation } from '@/shared/lib/geolocation';

import { useKakaoMap } from '../lib/use-kakao-map';
import { MOCK_BOOKMARK_PLACES, MOCK_PLACES } from '../model/mock-data';

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedType, setSelectedType] = useState<PlaceLayer>('record');
  const [fromList, setFromList] = useState<PlaceLayer | null>(null);
  const [recordVisible, setRecordVisible] = useState(true);
  const [bookmarkVisible, setBookmarkVisible] = useState(true);

  const handle = useMemo(() => BottomSheet.createHandle(), []);
  const listHandle = useMemo(() => BottomSheet.createHandle(), []);

  const {
    containerRef,
    mapRef,
    handleLoad,
    deselect,
    selectPlace,
    panToWithOffset,
    setRecordVisible: setMapRecordVisible,
    setBookmarkVisible: setMapBookmarkVisible,
  } = useKakaoMap({
    recordPlaces: MOCK_PLACES,
    bookmarkPlaces: MOCK_BOOKMARK_PLACES,
    onPlaceSelect: (place, type) => {
      setSelectedPlace(place);
      if (type) setSelectedType(type);
      setFromList(null);
      handle.close();
      listHandle.close();
    },
  });

  useUserLocation((coords) => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
    );
  });

  const handleToggleRecord = (v: boolean) => {
    setRecordVisible(v);
    setMapRecordVisible(v);
  };

  const handleToggleBookmark = (v: boolean) => {
    setBookmarkVisible(v);
    setMapBookmarkVisible(v);
  };

  const handlePlaceSelect = (place: Place, type: PlaceLayer) => {
    setSelectedPlace(place);
    setSelectedType(type);
    setFromList(type);
    selectPlace(place);
    panToWithOffset(place.lat, place.lng);
  };

  const handleSelectedClose = () => {
    deselect();
    setSelectedPlace(null);
    setFromList(null);
  };

  const handleSelectedBack = () => {
    setSelectedPlace(null);
    setFromList(null);
    listHandle.open(null);
  };

  const handleViewPosts = () => {
    if (!selectedPlace) return;
  };

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=clusterer&autoload=false`}
        strategy="afterInteractive"
        onLoad={handleLoad}
      />
      <div className="relative z-0 h-[calc(100dvh-var(--spacing-bottom-tab))] w-full max-w-layout">
        <div ref={containerRef} className="absolute inset-0" />
        <div className="absolute top-0 right-0 left-0 z-10 p-6">
          <Input
            className="shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]"
            placeholder="기록했던 장소를 입력해 주세요"
            trailing={
              <button>
                <SearchIcon />
              </button>
            }
          />
        </div>
        <div className="absolute right-0 bottom-6 left-0 z-10 flex justify-center">
          <BottomSheet.Trigger
            handle={handle}
            render={
              <button className="label-md inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-semantic-accent-normal bg-semantic-system-white px-6 py-3 text-semantic-accent-normal">
                리스트 보기
                <ArrowIcon />
              </button>
            }
          />
        </div>
      </div>
      <MapListSheet
        handle={handle}
        listHandle={listHandle}
        recordPlaces={MOCK_PLACES}
        bookmarkPlaces={MOCK_BOOKMARK_PLACES}
        recordVisible={recordVisible}
        bookmarkVisible={bookmarkVisible}
        onToggleRecord={handleToggleRecord}
        onToggleBookmark={handleToggleBookmark}
        onPlaceSelect={handlePlaceSelect}
      />
      <SelectedPlaceSheet
        place={selectedPlace}
        placeType={selectedType}
        onClose={handleSelectedClose}
        onBack={fromList ? handleSelectedBack : undefined}
        onViewPosts={handleViewPosts}
      />
    </>
  );
}
