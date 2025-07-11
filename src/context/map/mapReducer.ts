import { MapState } from "./MapProvider";
import maplibregl from 'maplibre-gl';

type MapActions = {
    type: 'setMap',
    payload: maplibregl
}

export const mapReducer = (state: MapState, action: MapActions): MapState => {

    switch (action.type) {
        case 'setMap': 
            return {
                isMapReady: true,
                map: action.payload
            }
    
        default:
          return state;
    }
} 