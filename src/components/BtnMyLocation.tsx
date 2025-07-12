import { useContext } from "react"
import { MapContext, PlacesContext } from "../context/index"
import maplibregl from 'maplibre-gl';


export const BtnMyLocation = () => {
    const { map, isMapReady } = useContext(MapContext);
    const { userLocation } = useContext(PlacesContext);


    const handlerMapFlyTo= () => {
        map?.flyTo({
            zoom: 6,
            center: userLocation
        })

        if(!isMapReady) throw new Error("Map is not ready yet");
        if(!userLocation) throw new Error("No location available");
        
      
    }

    return (
        <button className='btn btn-primary'
        style={{ 
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999
        }}
        onClick={handlerMapFlyTo}
        >
            my location
        </button>
    )
}