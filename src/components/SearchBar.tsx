import { ChangeEvent, useRef, useContext, useTransition } from "react";
import { PlacesContext } from "../context/index";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
    const { searchPlacesByTerm } = useContext(PlacesContext);
    const debounceRef = useRef<any>();
    const [isPending, startTransition] = useTransition(); // concurrent rendering hook

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const term = event.target.value;
            startTransition(() => {
                searchPlacesByTerm(term);
            });
        }, 400);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="form-control"
                placeholder="Search Place"
                onChange={onQueryChange}
            />
            {isPending && <p>Searching...</p>}
            <SearchResults />
        </div>
    );
};
