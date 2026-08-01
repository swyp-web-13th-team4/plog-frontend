'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import { BottomSheet, Icon, Input } from '@plog/ui';

import { type MapSortType, type PlaceLayer } from '@/entities/place';

import { KAKAO_MAP_SDK_URL } from '@/shared/api/constants';
import { useUserLocation } from '@/shared/lib/geolocation';

import { useKakaoMap } from '../lib/use-kakao-map';
import { type MapBounds } from '../model/types';
import { useMapPinDetailQuery } from '../model/use-map-pin-detail-query';
import { useMapPinsQuery } from '../model/use-map-pins-query';
import MapListSheet from './MapListSheet';
import MapPlaceSearchOverlay from './MapPlaceSearchOverlay';
import SelectedPlaceSheet from './SelectedPlaceSheet';

const DEFAULT_SORT: MapSortType = 'LATEST';

export default function MapPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const initPlaceId = Number(searchParams.get('placeId'));
  const initLat = Number(searchParams.get('lat'));
  const initLng = Number(searchParams.get('lng'));
  const initType = searchParams.get('type');
  const initSelection =
    Number.isInteger(initPlaceId) &&
    initPlaceId > 0 &&
    Number.isFinite(initLat) &&
    initLat !== 0 &&
    Number.isFinite(initLng) &&
    initLng !== 0 &&
    (initType === 'record' || initType === 'bookmark')
      ? {
          placeId: initPlaceId,
          type: initType as PlaceLayer,
          lat: initLat,
          lng: initLng,
        }
      : null;

  const pendingRef = useRef(initSelection);
  const hasParamNavRef = useRef(!!initSelection);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(
    initSelection?.placeId ?? null,
  );
  const [selectedType, setSelectedType] = useState<PlaceLayer>(
    initSelection?.type ?? 'record',
  );
  const [fromList, setFromList] = useState(false);
  const [recordVisible, setRecordVisible] = useState(true);
  const [bookmarkVisible, setBookmarkVisible] = useState(true);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(
    initSelection ? { lat: initSelection.lat, lng: initSelection.lng } : null,
  );

  const handle = useMemo(() => BottomSheet.createHandle(), []);
  const listHandle = useMemo(() => BottomSheet.createHandle(), []);

  const { data: recordPins } = useMapPinsQuery('record', bounds, DEFAULT_SORT);
  const { data: bookmarkPins } = useMapPinsQuery(
    'bookmark',
    bounds,
    DEFAULT_SORT,
  );
  const { data: selectedPlace } = useMapPinDetailQuery(
    selectedPlaceId,
    selectedType,
  );

  const {
    containerRef,
    mapRef,
    handleLoad,
    deselect,
    selectPin,
    panToWithOffset,
    setRecordVisible: setMapRecordVisible,
    setBookmarkVisible: setMapBookmarkVisible,
  } = useKakaoMap({
    recordPins: recordPins ?? [],
    bookmarkPins: bookmarkPins ?? [],
    onPlaceSelect: (pin, type) => {
      if (!pin || !type) {
        setSelectedPlaceId(null);
        setSelectedCoords(null);
        return;
      }
      setSelectedPlaceId(pin.placeId);
      setSelectedType(type);
      setSelectedCoords({ lat: pin.latitude, lng: pin.longitude });
      setFromList(false);
      handle.close();
      listHandle.close();
    },
    onBoundsChange: (b) => setBounds(b),
    onReady: () => {
      if (!pendingRef.current) return;
      panToWithOffset(pendingRef.current.lat, pendingRef.current.lng);
    },
  });

  useEffect(() => {
    if (!pendingRef.current) return;
    const { placeId, type } = pendingRef.current;
    const pins = type === 'record' ? recordPins : bookmarkPins;
    if (pins?.some((p) => p.placeId === placeId)) {
      selectPin(placeId, type);
      pendingRef.current = null;
    }
  }, [recordPins, bookmarkPins, selectPin]);

  useUserLocation((coords) => {
    if (
      !mapRef.current ||
      !window.kakao ||
      pendingRef.current ||
      hasParamNavRef.current
    )
      return;
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

  const handlePlaceSelect = (
    placeId: number,
    type: PlaceLayer,
    latitude: number,
    longitude: number,
  ) => {
    setSelectedPlaceId(placeId);
    setSelectedType(type);
    setSelectedCoords({ lat: latitude, lng: longitude });
    setFromList(true);
    pendingRef.current = { placeId, type, lat: latitude, lng: longitude };
    selectPin(placeId, type);
    panToWithOffset(latitude, longitude);
  };

  const handleSelectedClose = () => {
    pendingRef.current = null;
    deselect();
    setSelectedPlaceId(null);
    setSelectedCoords(null);
    setFromList(false);
  };

  const handleSelectedBack = () => {
    pendingRef.current = null;
    setSelectedPlaceId(null);
    setSelectedCoords(null);
    setFromList(false);
    listHandle.open(null);
  };

  const handleViewPosts = () => {
    if (!selectedPlaceId) return;
    const params = new URLSearchParams({ type: selectedType });
    if (selectedPlace?.placeName) params.set('name', selectedPlace.placeName);
    router.push(`/map/places/${selectedPlaceId}?${params}`);
  };

  const handleViewReviews = () => {
    if (!selectedPlaceId) return;
    router.push(`/review/places/${selectedPlaceId}`);
  };

  const handleCreatePost = () => {
    if (selectedPlace && selectedCoords) {
      sessionStorage.setItem(
        'map:initial-place',
        JSON.stringify({
          name: selectedPlace.placeName,
          address: selectedPlace.address,
          latitude: selectedCoords.lat,
          longitude: selectedCoords.lng,
        }),
      );
    }
    router.push('/log');
  };

  return (
    <>
      <Script
        src={KAKAO_MAP_SDK_URL}
        strategy="afterInteractive"
        onReady={handleLoad}
      />
      <div className="relative z-0 h-[calc(100dvh-var(--spacing-bottom-tab))] w-full max-w-layout">
        <div ref={containerRef} className="absolute inset-0" />
        <div className="absolute top-0 right-0 left-0 z-10 p-6">
          <Input
            className="cursor-pointer shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]"
            placeholder="기록했던 장소를 입력해 주세요"
            readOnly
            onClick={() => setIsSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsSearchOpen(true);
              }
            }}
            trailing={
              <Icon
                name="search"
                size={20}
                className="text-semantic-object-subtle"
              />
            }
          />
        </div>
        <div className="absolute right-0 bottom-6 left-0 z-10 flex justify-center">
          <BottomSheet.Trigger
            handle={handle}
            render={
              <button className="label-md inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-semantic-accent-normal bg-semantic-system-white px-6 py-3 text-semantic-accent-normal">
                리스트 보기
                <Icon
                  name="chevron-up"
                  size={20}
                  className="text-semantic-accent-normal"
                />
              </button>
            }
          />
        </div>
      </div>
      <MapListSheet
        handle={handle}
        listHandle={listHandle}
        recordVisible={recordVisible}
        bookmarkVisible={bookmarkVisible}
        onToggleRecord={handleToggleRecord}
        onToggleBookmark={handleToggleBookmark}
        onPlaceSelect={handlePlaceSelect}
      />
      <SelectedPlaceSheet
        place={selectedPlace ?? null}
        placeType={selectedType}
        onClose={handleSelectedClose}
        onBack={fromList ? handleSelectedBack : undefined}
        onViewPosts={handleViewPosts}
        onViewReviews={handleViewReviews}
        onCreatePost={handleCreatePost}
      />
      {isSearchOpen && (
        <div className="fixed inset-0 z-10 mx-auto max-w-layout">
          <MapPlaceSearchOverlay
            onSelectPlace={(place) => {
              setIsSearchOpen(false);
              setSelectedPlaceId(place.placeId);
              setSelectedType('record');
              setFromList(false);
              pendingRef.current = {
                placeId: place.placeId,
                type: 'record',
                lat: place.latitude,
                lng: place.longitude,
              };
              selectPin(place.placeId, 'record');
              panToWithOffset(place.latitude, place.longitude);
            }}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      )}
    </>
  );
}
