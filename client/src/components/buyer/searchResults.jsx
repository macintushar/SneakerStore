import { useParams } from "react-router";



function SearchResults() {
    let { term } = useParams();
    return(
        <h1 className="text-black">{term}</h1>
    )
}

export default SearchResults;