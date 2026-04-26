'use client';

import { useMemo } from 'react';

import Script from 'next/script';

import { BottomSheet, Input } from '@plog/ui';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useUserLocation } from '@/shared/lib/geolocation/use-user-location';

import { useKakaoMap } from '../lib/use-kakao-map';

export default function MapPage() {
  const { containerRef, mapRef, handleLoad } = useKakaoMap();
  const handle = useMemo(() => BottomSheet.createHandle(), []);

  useUserLocation((coords) => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
    );
  });

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`}
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
      <BottomSheet
        handle={handle}
        modal={false}
        disablePointerDismissal
        snapPoints={[0.4, 1]}
      >
        <BottomSheet.Content
          className="mb-bottom-tab h-[calc(90%-96px)] max-w-layout"
          backdrop={false}
        >
          <BottomSheet.Handle />
          <BottomSheet.Body className="min-h-0 overflow-y-auto overscroll-contain">
            <p />
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
}
