import { createContext } from "react";
import maplibregl from 'maplibre-gl';


interface MapContextProps {
    isMapReady: boolean;
    map?: maplibregl;

    //methods
    setMap: (map: maplibregl) => void;
    getRouteBetweenPoints: (start: [number, number], end: [number, number])
     => Promise<void>;
}

export const MapContext = createContext({} as MapContextProps);