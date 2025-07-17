import { useContext, useReducer, useEffect } from 'react';
import maplibregl, { Marker } from 'maplibre-gl';
import { PlacesContext } from '../index';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import directionsApi from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions';
import { number } from 'prop-types';

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


            const response = await directionsApi.get<DirectionsResponse>(`/driving/${start.join(',')};${end.join(',')}`, {
                params: {
                  overview: 'full',
                  geometries: 'geojson'
                }
              });
            
            //   return response.data.routes[0].geometry.coordinates;

            const { distance, duration, geometry } = response.data.routes[0];


            const { coordinates: coords } = geometry;

            let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms /= 100;

            const minutes = Math.floor(duration/60);
            console.log(response)

            const bounds = new maplibregl.LngLatBounds(
                start,
                start
            );

            for (const coord of coords) {
                const newCoord: [number, number] = [ coord[0], coord[1]];

                bounds.extend(newCoord);
            }

            state.map?.fitBounds(bounds, {
                padding: 200
            });

            //Polyline
            const routeGeoJson = {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: coords 
                },
                properties: {}
              };

              if (state.map?.getSource('route')) {
                state.map.removeLayer('route-line');
                state.map.removeSource('route');
              }
              
              // Agrega la fuente con los datos de la ruta
              state.map?.addSource('route', {
                type: 'geojson',
                data: routeGeoJson
              });

              if(state.map?.getLayer('route-line')) {
                state.map.removeLayer('route-line');
                state.map.removeSource('route-line');
              }
              
              // Agrega la capa visual
              state.map?.addLayer({
                id: 'route-line',
                type: 'line',
                source: 'route',
                paint: {
                  'line-color': '#FF0000',
                  'line-width': 4,
                  'line-opacity': 0.9
                }
              });
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