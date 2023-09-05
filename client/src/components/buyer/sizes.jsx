import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SizesOption() {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('http://65.1.76.191:5001/shoe/' + id)
        .then(response => response.json())
        .then(data => setData(data[0]))
    }, []);
    if(!data.inventory) {
        return "Loading"
    }
    
    if(data.inventory.length > 0) {
        console.log(data.inventory)
        return(
            <>
            <label htmlFor="size" className="block text-gray-700 font-semibold mb-2">Choose a size:</label>
            <select id="size" className="block border border-gray-300 py-2 px-4 rounded-lg mb-4 text-black">
                {data.inventory.map(item => (
                    <option value={item.size} key={item.size}>{item.size}</option>
                ))}
            </select>
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none" type="submit">Add to cart</button>
            </>
        )
    }
}

export default SizesOption;