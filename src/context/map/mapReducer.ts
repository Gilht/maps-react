import { MapState } from "./MapProvider";
import maplibregl, { Marker } from 'maplibre-gl';

type MapActions = {
    type: 'setMap',
    payload: maplibregl
} | {
    type: 'setMarkers',
    payload: Marker[]
}

export const mapReducer = (state: MapState, action: MapActions): MapState => {

    switch (action.type) {
        case 'setMap': 
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }


            case 'setMarkers': 
            return {
                ...state,
                markers: action.payload
            }
    
        default:
          return state;
    }
} 