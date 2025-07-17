import { useContext, useState} from "react"
import { MapContext, MapProvider, PlacesContext } from "../context/index";
import { Feature } from "../interfaces/places";



export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenPoints } = useContext(MapContext);

    const [activeId, setActiveId] = useState<string>('');

   

    const onPlaceClicked = (place: Feature) => {

        const [lng, lat] = place.center;
        setActiveId(place.id);
        map?.flyTo({
            zoom: 6,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) => {
        if(!userLocation) return;

        const [lng, lat] = place.center;

        getRouteBetweenPoints(userLocation, [lng, lat]);
    }

    if(isLoadingPlaces) {
        return (
            <div className="alert alert-primary mt-2 text-center">
                <h6>Searching Place</h6>
            </div>
        )
    }

    if(places.length === 0) {
        return <></>;
    }

    return (
        <ul className="list-group mt-3">

            {places.map(place => (
                  <li
                  key={place.id}
                  className={`list-group-item list-group-item-action pointer ${(activeId === place.id) ? 'active' : ''}`} 
                  onClick={() => onPlaceClicked(place)}
                  >
                  <h6>{place.text_es}</h6>
  
                  <p
                  className="text-muted"
                  style={{
                      fontSize: '12px'
                  }}
                  >{place.place_name}
                  </p>
                  
                  <button className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`} 
                  onClick={() => getRoute(place)}
                  >
                      Direcciones
                  </button>
              </li>
            ))}
          
        </ul>
    )
}