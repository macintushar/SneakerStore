import { Link } from "react-router-dom";

function SearchProducts() {

    function handleClick(e) {
        e.preventDefault();
        var term = document.getElementById("productSearch").value;
        console.log("/search/"+term)
        window.location.href = "/search/"+term
    }

    return(
        <form className="container mx-auto">
            <input type="text" className="peer block min-h-30 w-full text-black rounded border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="productSearch" placeholder="Search..." data-te-input-showcounter="true" maxLength="60" />
            <button type="submit" onClick={handleClick} className="bg-green-400 mt-5">Search</button>
        </form>
    )
}

export default SearchProducts;