import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import NewProductsBtn from "./new-inventory-btn";

function AllInventory() {

    const [data,setData] = useState()
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/inventory/all")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    async function handleDelete(event) {
        event.preventDefault();
        
        var pid = event.target.value;
        console.log(pid)

        fetch("http://65.1.76.191:5001/admin/manage/products/delete/" + pid)
        .then(response => response.json())
        .then(alert("Deleted product with ID: " + pid))
        .catch(error => console.error(error));
    }

    if(!data) {
        return(<h3 className="text-black">"Loading.."</h3>)
    }

    return(
    <div className="flex flex-col text-black mx-auto overflow-auto w-5/6 mt-10">
        <div className="container mx-auto mt-10">
            <Link to="http://localhost:5173/admin/">
                <img src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1681502937/SneakerStreet/assets/undo.png" width="2%" />
            </Link>
        </div>
        <table className="text-left text-sm font-dark table-auto overflow-scroll">
            <thead className="border-b font-medium">
                <tr>
                    <th scope="col" className="px-6 py-4">Inventory ID</th>
                    <th scope="col" className="px-6 py-4">Product ID</th>
                    <th scope="col" className="px-6 py-4">SKU</th>
                    <th scope="col" className="px-6 py-4">Size</th>
                    <th scope="col" className="px-6 py-4">Quantity</th>
                    <th scope="col" className="px-6 py-4">Edit</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr className="border-b" key={item.inventory_id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.inventory_id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.product_id}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.sku}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.size}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.quantity}</td>

                        <td className="whitespace-nowrap px-6 py-4">
                            <Link to={"/admin/manage/inventory/edit/" + item.inventory_id}>
                                <button className="text-xs uppercase dark:text-white" style={{backgroundColor:"green"}}>Edit</button> 
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <NewProductsBtn />
    </div>
    )
}

export default AllInventory