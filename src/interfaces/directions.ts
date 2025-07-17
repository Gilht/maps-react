export interface LineStringGeometry {
    type: 'LineString';
    coordinates: Coordinate[];
  }

  export type Coordinate = [number, number]; // [lng, lat]

  export interface GeoJsonFeature {
    type: 'Feature';
    geometry: LineStringGeometry;
    properties: {
      [key: string]: any;
    };
  }
  
  export interface FeatureCollection {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
  }
  