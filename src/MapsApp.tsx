import { MapProvider, PlacesProvider } from "./context/index";
import { HomeScreen } from './screens/HomeScreen';
import './index.css';

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomeScreen />
            </MapProvider>
        </PlacesProvider>
    )
}