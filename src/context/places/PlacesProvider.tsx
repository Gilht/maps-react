import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers/getUserLocation";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";


interface Props {
    children: JSX.Element | JSX.Element[];
}

//Obtener informacion de nuestro context
export interface PlacesState{
    isLoading: boolean;
    userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

export const PlacesProvider = ({children}: Props) => {
    
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
    
    useEffect(() => {
        getUserLocation()
        .then(lngNlat => dispatch({type: 'setUserLocation', payload: lngNlat})); 
    }, [])

    return (        
        <PlacesContext.Provider value={{
            ...state,
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
