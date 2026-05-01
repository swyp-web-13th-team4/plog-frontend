'use client';

import { useEffect, useRef } from 'react';

import { type Place, type PlaceLayer } from '@/entities/place';

import { buildPinHtml, getClusterStyles, WRAPPER_Y_ANCHOR } from './kakao-pin';

const getPlaceCount = (place: Place, type: PlaceLayer) =>
  type === 'record' ? (place.recordCount ?? 0) : (place.bookmarkCount ?? 0);

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_LEVEL = 6;
const MAX_LEVEL = 12;
const MIN_CLUSTER_LEVEL = 4;
export const SELECTED_LEVEL = 3;

type SelectedInfo = {
  el: HTMLDivElement;
  place: Place;
  placeType: PlaceLayer;
  markerSrc: string;
  selectedSrc: string;
};

type UseKakaoMapOptions = {
  recordPlaces?: Place[];
  bookmarkPlaces?: Place[];
  onPlaceSelect?: (place: Place | null, type?: PlaceLayer) => void;
};

function panToPosition(
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  containerHeight: number,
) {
  const offset = containerHeight * 0.2;
  const proj = map.getProjection();
  const pinPoint = proj.pointFromCoords(position);
  map.panTo(
    proj.coordsFromPoint(
      new window.kakao.maps.Point(pinPoint.x, pinPoint.y + offset),
    ),
  );
}

export function useKakaoMap({
  recordPlaces = [],
  bookmarkPlaces = [],
  onPlaceSelect,
}: UseKakaoMapOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const cleanupListenersRef = useRef<(() => void) | null>(null);

  const selectedRef = useRef<SelectedInfo | null>(null);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const recordOverlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const bookmarkOverlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const recordMarkersRef = useRef<kakao.maps.Marker[]>([]);
  const bookmarkMarkersRef = useRef<kakao.maps.Marker[]>([]);
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const overlayInfoMapRef = useRef<Map<string, SelectedInfo>>(new Map());
  const recordVisibleRef = useRef(true);
  const bookmarkVisibleRef = useRef(true);

  useEffect(() => {
    return () => {
      cleanupListenersRef.current?.();
    };
  }, []);

  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelect;
  });

  const deselect = () => {
    if (!selectedRef.current) return;
    const { el, place, placeType, markerSrc } = selectedRef.current;
    el.innerHTML = buildPinHtml(
      markerSrc,
      place.imageUrl,
      getPlaceCount(place, placeType),
      false,
    );
    selectedRef.current = null;
  };

  const setLayerVisible = (
    overlays: kakao.maps.CustomOverlay[],
    markers: kakao.maps.Marker[],
    visible: boolean,
  ) => {
    const map = mapRef.current;
    if (!map) return;
    const showOverlays = visible && map.getLevel() < MIN_CLUSTER_LEVEL;
    overlays.forEach((o) => o.setMap(showOverlays ? map : null));
    if (clustererRef.current) {
      if (visible) clustererRef.current.addMarkers(markers);
      else clustererRef.current.removeMarkers(markers);
    }
  };

  const setRecordVisible = (visible: boolean) => {
    recordVisibleRef.current = visible;
    setLayerVisible(
      recordOverlaysRef.current,
      recordMarkersRef.current,
      visible,
    );
  };

  const setBookmarkVisible = (visible: boolean) => {
    bookmarkVisibleRef.current = visible;
    setLayerVisible(
      bookmarkOverlaysRef.current,
      bookmarkMarkersRef.current,
      visible,
    );
  };

  const createPinClickHandler =
    (
      map: kakao.maps.Map,
      place: Place,
      position: kakao.maps.LatLng,
      el: HTMLDivElement,
      markerSrc: string,
      selectedSrc: string,
      placeType: PlaceLayer,
    ) =>
    () => {
      if (selectedRef.current?.el === el) return;
      deselect();
      el.innerHTML = buildPinHtml(
        selectedSrc,
        place.imageUrl,
        getPlaceCount(place, placeType),
        true,
      );
      selectedRef.current = { el, place, placeType, markerSrc, selectedSrc };
      if (map.getLevel() > SELECTED_LEVEL) map.setLevel(SELECTED_LEVEL);
      panToPosition(map, position, containerRef.current?.clientHeight ?? 0);
      onPlaceSelectRef.current?.(place, placeType);
    };

  const buildPlaceLayer = (
    map: kakao.maps.Map,
    places: Place[],
    markerSrc: string,
    selectedSrc: string,
    placeType: PlaceLayer,
  ) => {
    const invisibleImage = new window.kakao.maps.MarkerImage(
      '/transparent.png',
      new window.kakao.maps.Size(1, 1),
    );
    const overlays: kakao.maps.CustomOverlay[] = [];
    const markers: kakao.maps.Marker[] = [];
    const infos = new Map<string, SelectedInfo>();

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.lat, place.lng);
      const el = document.createElement('div');
      el.innerHTML = buildPinHtml(
        markerSrc,
        place.imageUrl,
        getPlaceCount(place, placeType),
        false,
      );

      infos.set(`${placeType}:${place.id}`, {
        el,
        place,
        placeType,
        markerSrc,
        selectedSrc,
      });
      el.addEventListener(
        'click',
        createPinClickHandler(
          map,
          place,
          position,
          el,
          markerSrc,
          selectedSrc,
          placeType,
        ),
      );

      overlays.push(
        new window.kakao.maps.CustomOverlay({
          position,
          content: el,
          xAnchor: 0.5,
          yAnchor: WRAPPER_Y_ANCHOR,
          zIndex: 3,
        }),
      );

      for (let i = 0; i < getPlaceCount(place, placeType); i++) {
        markers.push(
          new window.kakao.maps.Marker({ position, image: invisibleImage }),
        );
      }
    });

    return { overlays, markers, infos };
  };

  const initClusterer = (map: kakao.maps.Map, markers: kakao.maps.Marker[]) =>
    new window.kakao.maps.MarkerClusterer({
      map,
      markers,
      averageCenter: true,
      minLevel: MIN_CLUSTER_LEVEL,
      minClusterSize: 1,
      gridSize: 80,
      calculator: [20, 50],
      styles: getClusterStyles(),
    });

  const handleLoad = () => {
    window.kakao.maps.load(() => {
      if (!containerRef.current) return;

      const map = new window.kakao.maps.Map(containerRef.current, {
        center: new window.kakao.maps.LatLng(
          DEFAULT_CENTER.lat,
          DEFAULT_CENTER.lng,
        ),
        level: DEFAULT_LEVEL,
        maxLevel: MAX_LEVEL,
      });
      mapRef.current = map;

      const record = buildPlaceLayer(
        map,
        recordPlaces,
        '/record-marker.svg',
        '/record-marker-selected.svg',
        'record',
      );
      const bookmark = buildPlaceLayer(
        map,
        bookmarkPlaces,
        '/bookmark-marker.svg',
        '/bookmark-marker-selected.svg',
        'bookmark',
      );

      recordOverlaysRef.current = record.overlays;
      bookmarkOverlaysRef.current = bookmark.overlays;
      recordMarkersRef.current = record.markers;
      bookmarkMarkersRef.current = bookmark.markers;
      overlayInfoMapRef.current = new Map([...record.infos, ...bookmark.infos]);
      clustererRef.current = initClusterer(map, [
        ...record.markers,
        ...bookmark.markers,
      ]);

      const updateOverlays = () => {
        const show = map.getLevel() < MIN_CLUSTER_LEVEL;
        record.overlays.forEach((o) =>
          o.setMap(show && recordVisibleRef.current ? map : null),
        );
        bookmark.overlays.forEach((o) =>
          o.setMap(show && bookmarkVisibleRef.current ? map : null),
        );
      };

      const onZoomChanged = updateOverlays;
      const onMapClick = () => {
        if (selectedRef.current) {
          deselect();
          onPlaceSelectRef.current?.(null);
        }
      };

      window.kakao.maps.event.addListener(map, 'zoom_changed', onZoomChanged);
      window.kakao.maps.event.addListener(map, 'click', onMapClick);

      cleanupListenersRef.current = () => {
        window.kakao.maps.event.removeListener(
          map,
          'zoom_changed',
          onZoomChanged,
        );
        window.kakao.maps.event.removeListener(map, 'click', onMapClick);
      };

      updateOverlays();
    });
  };

  const selectPlace = (place: Place, placeType: PlaceLayer) => {
    const info = overlayInfoMapRef.current.get(`${placeType}:${place.id}`);
    if (!info) return;
    if (selectedRef.current?.el === info.el) return;
    deselect();
    info.el.innerHTML = buildPinHtml(
      info.selectedSrc,
      place.imageUrl,
      getPlaceCount(place, info.placeType),
      true,
    );
    selectedRef.current = info;
  };

  const panToWithOffset = (lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLevel() > SELECTED_LEVEL) map.setLevel(SELECTED_LEVEL);
    panToPosition(
      map,
      new window.kakao.maps.LatLng(lat, lng),
      containerRef.current?.clientHeight ?? 0,
    );
  };

  return {
    containerRef,
    mapRef,
    handleLoad,
    deselect,
    selectPlace,
    panToWithOffset,
    setRecordVisible,
    setBookmarkVisible,
  };
}
