import { ChangeEvent, useRef } from "react";



export const SearchBar = () => {

    const debounceRef = useRef<any>();

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
       if(debounceRef.current)
            clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            console.log('time out', event.target.value);
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
        </div>
    )
}