'use client';

import { useEffect, useRef } from 'react';

export function useUserLocation(
  onSuccess: (coords: GeolocationCoordinates) => void,
) {
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      onSuccessRef.current(position.coords);
    });
  }, []);
}
