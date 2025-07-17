import { useContext, useReducer, useEffect } from 'react';
import maplibregl, { Marker } from 'maplibre-gl';
import { PlacesContext } from '../index';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import directionsApi from '../../apis/directionsApi';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export interface MapState {
    isMapReady: boolean;
    map?: maplibregl;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

export const MapProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;

            const popup = new maplibregl.Popup({closeOnClick: false})
            .setHTML(`<h6>${place.text_es}</h6>
            <p>${place.place_name_es}</p>
            `);

            const newMarker = new maplibregl.Marker({
                color: 'red'
            })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(state.map!);

            newMarkers.push(newMarker);

            dispatch({ type: 'setMarkers', payload: newMarkers });
        }

    }, [places])

    const setMap = (map: maplibregl) => {

        dispatch({type: 'setMap', payload: map});

        const myPopUp = new maplibregl.Popup({closeOnClick: false})
        .setHTML(`<h6>Hello World!</h6>`)
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

    const getRouteBetweenPoints = async (start: [number, number], 
        end: [number, number]): any => {


            const response = await directionsApi.get(`/driving/${start.join(',')};${end.join(',')}`, {
                params: {
                  overview: 'full',
                  geometries: 'geojson'
                }
              });
            
            //   return response.data.routes[0].geometry.coordinates;
            console.log(response.)
    }


    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>
            {children}
        </MapContext.Provider>
    )
}