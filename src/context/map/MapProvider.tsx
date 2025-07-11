import maplibregl from 'maplibre-gl';
import { useReducer } from 'react';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export interface MapState {
    isMapReady: boolean;
    map?: maplibregl;
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}



export const MapProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

    return (
        <MapContext.Provider value={{
            ...state
        }}>
            {children}
        </MapContext.Provider>
    )
}