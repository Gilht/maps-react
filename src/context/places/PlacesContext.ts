import { createContext } from 'react';

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [ number, number];
}

export const PlacesContext = createContext<PlacesContextProps>
({} as PlacesContextProps); //creamos contexto para tener los lugares guardados         