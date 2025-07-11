import { createContext } from "react";
import maplibregl from 'maplibre-gl';


interface MapContextProps {
    isMapReady: boolean;
    map?: maplibregl;
}

export const MapContext = createContext({} as MapContextProps);