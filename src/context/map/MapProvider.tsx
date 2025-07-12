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

    const setMap = (map: maplibregl) => {

        dispatch({type: 'setMap', payload: map});


        const myPopUp = new maplibregl.Popup({closeOnClick: false})
        .setHTML('<h1>Hello World!</h1>')
        .setLngLat([-100.32, 25.77,])
        .addTo(map);

        new maplibregl.Marker({
            color: 'red'
        })
        .setLngLat([-100.32, 25.77,])
        .setPopup(myPopUp)
        .addTo(map);

        return () => map.remove(); 
    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap
        }}>
            {children}
        </MapContext.Provider>
    )
}