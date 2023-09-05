import { useState, useEffect } from "react"
import AllSellers from "./seller/allSellers";
import NewSeller from "./seller/newSeller";

function AdminSellers(){
    const [data,setData] = useState()
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/sellers/all")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(<h3>"Loading.."</h3>)
    }

    return(
        <>
        <h1 className="text-black text-center">Manage Sellers</h1>
        <button className="m-4"> + Add new Seller</button>
        <NewSeller />
        <AllSellers />
        </>
    )
}

export default AdminSellers