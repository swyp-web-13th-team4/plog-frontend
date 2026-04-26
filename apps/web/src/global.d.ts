declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
  }
  class LatLng {
    constructor(lat: number, lng: number);
  }
  interface MapOptions {
    center: LatLng;
    level: number;
  }
  function load(callback: () => void): void;
}

interface Window {
  kakao: typeof kakao;
}
