'use client';

import { useEffect, useRef } from 'react';

import { type PlaceLayer } from '@/entities/place';

import { type MapBounds, type MapPin } from '../model/types';
import { buildPinHtml, getClusterStyles, WRAPPER_Y_ANCHOR } from './kakao-pin';

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_LEVEL = 6;
const MAX_LEVEL = 12;
const MIN_CLUSTER_LEVEL = 4;
export const SELECTED_LEVEL = 3;

const OVERLAY_Z_INDEX = 3;
const SELECTED_OVERLAY_Z_INDEX = 4;

type SelectedInfo = {
  el: HTMLDivElement;
  overlay: kakao.maps.CustomOverlay;
  pin: MapPin;
  placeType: PlaceLayer;
  markerSrc: string;
  selectedSrc: string;
};

type UseKakaoMapOptions = {
  recordPins?: MapPin[];
  bookmarkPins?: MapPin[];
  onPlaceSelect?: (pin: MapPin | null, type?: PlaceLayer) => void;
  onBoundsChange?: (bounds: MapBounds) => void;
  onReady?: () => void;
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
  recordPins = [],
  bookmarkPins = [],
  onPlaceSelect,
  onBoundsChange,
  onReady,
}: UseKakaoMapOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const cleanupListenersRef = useRef<(() => void) | null>(null);

  const selectedRef = useRef<SelectedInfo | null>(null);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const onBoundsChangeRef = useRef(onBoundsChange);
  const onReadyRef = useRef(onReady);
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

  useEffect(() => {
    onBoundsChangeRef.current = onBoundsChange;
  });

  useEffect(() => {
    onReadyRef.current = onReady;
  });

  const updateBounds = (map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    onBoundsChangeRef.current?.({
      swLat: sw.getLat(),
      swLng: sw.getLng(),
      neLat: ne.getLat(),
      neLng: ne.getLng(),
    });
  };

  const deselect = () => {
    if (!selectedRef.current) return;
    const { el, overlay, pin, markerSrc } = selectedRef.current;
    el.innerHTML = buildPinHtml(markerSrc, pin.thumbnailUrl, pin.count, false);
    overlay.setZIndex(OVERLAY_Z_INDEX);
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
      pin: MapPin,
      position: kakao.maps.LatLng,
      el: HTMLDivElement,
      overlay: kakao.maps.CustomOverlay,
      markerSrc: string,
      selectedSrc: string,
      placeType: PlaceLayer,
    ) =>
    () => {
      if (selectedRef.current?.el === el) return;
      deselect();
      el.innerHTML = buildPinHtml(
        selectedSrc,
        pin.thumbnailUrl,
        pin.count,
        true,
      );
      overlay.setZIndex(SELECTED_OVERLAY_Z_INDEX);
      selectedRef.current = {
        el,
        overlay,
        pin,
        placeType,
        markerSrc,
        selectedSrc,
      };
      if (map.getLevel() > SELECTED_LEVEL) map.setLevel(SELECTED_LEVEL);
      panToPosition(map, position, containerRef.current?.clientHeight ?? 0);
      onPlaceSelectRef.current?.(pin, placeType);
    };

  const buildPinLayer = (
    map: kakao.maps.Map,
    pins: MapPin[],
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

    pins.forEach((pin) => {
      const position = new window.kakao.maps.LatLng(
        pin.latitude,
        pin.longitude,
      );
      const el = document.createElement('div');
      el.innerHTML = buildPinHtml(
        markerSrc,
        pin.thumbnailUrl,
        pin.count,
        false,
      );

      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: el,
        xAnchor: 0.5,
        yAnchor: WRAPPER_Y_ANCHOR,
        zIndex: OVERLAY_Z_INDEX,
      });

      infos.set(`${placeType}:${pin.placeId}`, {
        el,
        overlay,
        pin,
        placeType,
        markerSrc,
        selectedSrc,
      });
      el.addEventListener(
        'click',
        createPinClickHandler(
          map,
          pin,
          position,
          el,
          overlay,
          markerSrc,
          selectedSrc,
          placeType,
        ),
      );

      overlays.push(overlay);

      for (let i = 0; i < pin.count; i++) {
        markers.push(
          new window.kakao.maps.Marker({ position, image: invisibleImage }),
        );
      }
    });

    return { overlays, markers, infos };
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    recordOverlaysRef.current.forEach((o) => o.setMap(null));
    bookmarkOverlaysRef.current.forEach((o) => o.setMap(null));

    if (clustererRef.current) {
      clustererRef.current.removeMarkers([
        ...recordMarkersRef.current,
        ...bookmarkMarkersRef.current,
      ]);
    }

    const record = buildPinLayer(
      map,
      recordPins,
      '/record-marker.svg',
      '/record-marker-selected.svg',
      'record',
    );
    const bookmark = buildPinLayer(
      map,
      bookmarkPins,
      '/bookmark-marker.svg',
      '/bookmark-marker-selected.svg',
      'bookmark',
    );

    recordOverlaysRef.current = record.overlays;
    bookmarkOverlaysRef.current = bookmark.overlays;
    recordMarkersRef.current = record.markers;
    bookmarkMarkersRef.current = bookmark.markers;
    overlayInfoMapRef.current = new Map([...record.infos, ...bookmark.infos]);

    if (clustererRef.current) {
      const markersToAdd = [
        ...(recordVisibleRef.current ? record.markers : []),
        ...(bookmarkVisibleRef.current ? bookmark.markers : []),
      ];
      clustererRef.current.addMarkers(markersToAdd);
    }

    const show = map.getLevel() < MIN_CLUSTER_LEVEL;
    record.overlays.forEach((o) =>
      o.setMap(show && recordVisibleRef.current ? map : null),
    );
    bookmark.overlays.forEach((o) =>
      o.setMap(show && bookmarkVisibleRef.current ? map : null),
    );

    if (selectedRef.current) {
      const { pin, placeType } = selectedRef.current;
      const newInfo = overlayInfoMapRef.current.get(
        `${placeType}:${pin.placeId}`,
      );
      if (newInfo) {
        newInfo.el.innerHTML = buildPinHtml(
          newInfo.selectedSrc,
          newInfo.pin.thumbnailUrl,
          newInfo.pin.count,
          true,
        );
        newInfo.overlay.setZIndex(SELECTED_OVERLAY_Z_INDEX);
        selectedRef.current = newInfo;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordPins, bookmarkPins]);

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

      clustererRef.current = new window.kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: MIN_CLUSTER_LEVEL,
        minClusterSize: 1,
        gridSize: 80,
        calculator: [20, 50],
        styles: getClusterStyles(),
      });

      const onZoomChanged = () => {
        const show = map.getLevel() < MIN_CLUSTER_LEVEL;
        recordOverlaysRef.current.forEach((o) =>
          o.setMap(show && recordVisibleRef.current ? map : null),
        );
        bookmarkOverlaysRef.current.forEach((o) =>
          o.setMap(show && bookmarkVisibleRef.current ? map : null),
        );
        updateBounds(map);
      };
      const onDragEnd = () => updateBounds(map);
      const onMapClick = () => {
        if (selectedRef.current) {
          deselect();
          onPlaceSelectRef.current?.(null);
        }
      };

      window.kakao.maps.event.addListener(map, 'zoom_changed', onZoomChanged);
      window.kakao.maps.event.addListener(map, 'dragend', onDragEnd);
      window.kakao.maps.event.addListener(map, 'click', onMapClick);

      cleanupListenersRef.current = () => {
        window.kakao.maps.event.removeListener(
          map,
          'zoom_changed',
          onZoomChanged,
        );
        window.kakao.maps.event.removeListener(map, 'dragend', onDragEnd);
        window.kakao.maps.event.removeListener(map, 'click', onMapClick);
      };

      updateBounds(map);
      onReadyRef.current?.();
    });
  };

  const selectPin = (placeId: number, placeType: PlaceLayer) => {
    const info = overlayInfoMapRef.current.get(`${placeType}:${placeId}`);
    if (!info) return;
    if (selectedRef.current?.el === info.el) return;
    deselect();
    info.el.innerHTML = buildPinHtml(
      info.selectedSrc,
      info.pin.thumbnailUrl,
      info.pin.count,
      true,
    );
    info.overlay.setZIndex(SELECTED_OVERLAY_Z_INDEX);
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
    setTimeout(() => updateBounds(map), 100);
  };

  return {
    containerRef,
    mapRef,
    handleLoad,
    deselect,
    selectPin,
    panToWithOffset,
    setRecordVisible,
    setBookmarkVisible,
  };
}
