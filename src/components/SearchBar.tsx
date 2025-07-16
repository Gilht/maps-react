import { ChangeEvent, useRef, useContext} from "react";
import { PlacesContext } from "../context/index";
import { SearchResults } from "./SearchResults";



export const SearchBar = () => {
    const {searchPlacesByTerm} = useContext(PlacesContext);
    const debounceRef = useRef<any>();

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
       if(debounceRef.current)
            clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 400);
    }


    return (
        <div className='search-container'>
            <input 
                type="text"
                className="form-control"
                placeholder="Search Place"
                onChange={ onQueryChange }
            />

            <SearchResults />
        </div>
    )
}