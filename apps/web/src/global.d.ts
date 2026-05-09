declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare namespace kakao.maps {
  class Projection {
    pointFromCoords(latlng: LatLng): Point;
    coordsFromPoint(point: Point): LatLng;
  }

  class LatLngBounds {
    getSouthWest(): LatLng;
    getNorthEast(): LatLng;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    panTo(latlng: LatLng): void;
    getLevel(): number;
    setLevel(level: number): void;
    getProjection(): Projection;
    getBounds(): LatLngBounds;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Size {
    constructor(width: number, height: number);
  }

  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }

  interface MarkerImageOptions {
    offset?: Point;
  }

  class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions);
  }

  interface MarkerOptions {
    map?: Map;
    position: LatLng;
    image?: MarkerImage;
  }

  class Marker {
    constructor(options: MarkerOptions);
  }

  interface CustomOverlayOptions {
    map?: Map;
    position: LatLng;
    content: string | HTMLElement;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
    getMap(): Map | null;
    setZIndex(zIndex: number): void;
    getZIndex(): number;
  }

  interface ClusterStyle {
    background?: string;
    border?: string;
    borderRadius?: string;
    color?: string;
    width?: string;
    height?: string;
    lineHeight?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
  }

  interface MarkerClustererOptions {
    map: Map;
    markers?: Marker[];
    gridSize?: number;
    averageCenter?: boolean;
    minLevel?: number;
    minClusterSize?: number;
    disableClickZoom?: boolean;
    calculator?: number[];
    styles?: ClusterStyle[];
  }

  class MarkerClusterer {
    constructor(options: MarkerClustererOptions);
    addMarkers(markers: Marker[], nodraw?: boolean): void;
    removeMarkers(markers: Marker[], nodraw?: boolean): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
    maxLevel?: number;
  }

  function load(callback: () => void): void;

  namespace event {
    function addListener(
      target: Map | Marker | MarkerClusterer,
      type: string,
      handler: (...args: unknown[]) => void,
    ): void;
    function removeListener(
      target: Map | Marker | MarkerClusterer,
      type: string,
      handler: (...args: unknown[]) => void,
    ): void;
  }

  namespace services {
    type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';

    interface PlacesSearchResultItem {
      id: string;
      place_name: string;
      category_name: string;
      category_group_code: string;
      category_group_name: string;
      phone: string;
      address_name: string;
      road_address_name: string;
      x: string;
      y: string;
      place_url: string;
      distance: string;
    }

    interface Pagination {
      current: number;
      first: number;
      gotoPage(page: number): void;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      last: number;
      nextPage(): void;
      perPage: number;
      prevPage(): void;
      totalCount: number;
    }

    type PlacesSearchCallback = (
      data: PlacesSearchResultItem[],
      status: Status,
      pagination: Pagination,
    ) => void;

    class Places {
      keywordSearch(keyword: string, callback: PlacesSearchCallback): void;
    }

    const Status: {
      OK: 'OK';
      ZERO_RESULT: 'ZERO_RESULT';
      ERROR: 'ERROR';
    };
  }
}

interface Window {
  kakao?: typeof kakao;
}
