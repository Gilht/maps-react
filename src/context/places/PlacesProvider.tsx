import { useEffect, useReducer } from "react";
import searchApi, { apiKey } from "../../apis/searchApi";
import { getUserLocation } from "../../helpers/getUserLocation";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";


interface Props {
    children: JSX.Element | JSX.Element[];
}

//Obtener informacion de nuestro context
export interface PlacesState{
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

export const PlacesProvider = ({children}: Props) => {
    
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
    
    useEffect(() => {
        getUserLocation()
        .then(lngNlat => dispatch({type: 'setUserLocation', payload: lngNlat})); 
    }, [])

    const searchPlacesByTerm = async (query: string)  => {
        if(query.length === 0) {

            dispatch({type: 'setPlaces', payload: []});
            return [];
        }

        dispatch({ type: 'setLoadingPlaces'});

        const resp = await searchApi.get<PlacesResponse>(`/${encodeURIComponent(query)}.json`,{
            params: {
                proximity: state.userLocation?.join(','),
                key: apiKey
            }
        });
        
        dispatch({ type: 'setPlaces', payload: resp.data.features});

        return resp.data.features;
    }

    return (        
        <PlacesContext.Provider value={{
            ...state,
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
