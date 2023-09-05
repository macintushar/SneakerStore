import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function AllProducts() {

    const [data,setData] = useState()
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/products/all")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, [data]);

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
        <table className="text-left text-sm font-dark table-auto overflow-scroll">
            <thead className="border-b font-medium">
                <tr>
                    <th scope="col" className="px-6 py-4">Product ID</th>
                    <th scope="col" className="px-6 py-4">Product Name</th>
                    <th scope="col" className="px-6 py-4">Image</th>
                    <th scope="col" className="px-6 py-4">Brand</th>
                    <th scope="col" className="px-6 py-4">Category</th>
                    <th scope="col" className="px-6 py-4">Seller ID</th>
                    <th scope="col" className="px-6 py-4">SKU</th>
                    <th scope="col" className="px-6 py-4">Height</th>
                    <th scope="col" className="px-6 py-4">Current Price</th>
                    <th scope="col" className="px-6 py-4">Original Price</th>
                    <th scope="col" className="px-6 py-4">Discount</th>
                    <th scope="col" className="px-6 py-4">Edit</th>
                    <th scope="col" className="px-6 py-4">Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr className="border-b" key={item.product_id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.product_id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.product_name}</td>
                        <td className="whitespace-nowrap px-6 py-4"><img src={item.image} alt={item.product_name}/></td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.brand}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.seller_id}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.sku}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.height}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.current_price}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.original_price}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.discount}</td>

                        <td className="whitespace-nowrap px-6 py-4">
                            <Link to={"/admin/manage/products/edit/" + item.product_id}>
                                <button className="text-xs uppercase dark:text-white" style={{backgroundColor:"green"}}>Edit</button> 
                            </Link>
                        </td>
                        
                        <td className="whitespace-nowrap px-6 py-4">
                            <button className="text-xs uppercase dark:text-white bg-danger" style={{backgroundColor:"red"}} id="deleteBtn" value={item.product_id} onClick={handleDelete}>Delete</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default AllProducts