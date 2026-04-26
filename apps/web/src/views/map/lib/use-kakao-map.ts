'use client';

import { useRef } from 'react';

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_LEVEL = 3;

export function useKakaoMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const handleLoad = () => {
    window.kakao.maps.load(() => {
      if (!containerRef.current) return;
      mapRef.current = new window.kakao.maps.Map(containerRef.current, {
        center: new window.kakao.maps.LatLng(
          DEFAULT_CENTER.lat,
          DEFAULT_CENTER.lng,
        ),
        level: DEFAULT_LEVEL,
      });
    });
  };

  return { containerRef, mapRef, handleLoad };
}
