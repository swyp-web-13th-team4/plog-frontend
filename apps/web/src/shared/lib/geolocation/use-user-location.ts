'use client';

import { useEffect } from 'react';

export function useUserLocation(
  onSuccess: (coords: GeolocationCoordinates) => void,
) {
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      onSuccess(position.coords);
    });
  }, []);
}
