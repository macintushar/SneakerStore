import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function AllOrders() {

    const [data,setData] = useState()
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/orders/all")
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

    async function setDelivered(event) {
        event.preventDefault();
        
        var oid = event.target.value;
        console.log(oid)

        fetch("http://65.1.76.191:5001/admin/manage/orders/delivered/" + oid)
        .then(response => response.json())
        .then(alert("Order Status set as Delivered for Order ID: " + oid))
        .catch(error => console.error(error));
    }
    
    async function setUnfulfilled(event) {
        event.preventDefault();
        
        var oid = event.target.value;
        console.log(oid)

        fetch("http://65.1.76.191:5001/admin/manage/orders/unfulfilled/" + oid)
        .then(response => response.json())
        .then(alert("Order Status set as Unfulfilled for Order ID: " + oid))
        .catch(error => console.error(error));
    }

    async function setShipped(event) {
        event.preventDefault();
        
        var oid = event.target.value;
        console.log(oid)

        fetch("http://65.1.76.191:5001/admin/manage/orders/shipped/" + oid)
        .then(response => response.json())
        .then(alert("Order Status set as Shipped for Order ID: " + oid))
        .catch(error => console.error(error));
    }

    if(!data) {
        return(<h3 className="text-black">"Loading.."</h3>)
    }

    return(
    <div className="flex flex-col text-black mx-auto overflow-auto w-5/6 mt-10">
        <table className="text-center text-sm font-dark table-auto overflow-scroll">
            <thead className="border-b font-medium">
                <tr>
                    <th scope="col" className="px-6 py-4">Order ID</th>
                    <th scope="col" className="px-6 py-4">Order Time</th>
                    <th scope="col" className="px-6 py-4">Order Status</th>
                    <th scope="col" className="px-6 py-4">Order Price</th>
                    <th scope="col" className="px-6 py-4">Buyer ID</th>
                    <th scope="col" className="px-6 py-4">Set Order Status</th>
                    <th scope="col" className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr className="border-b" key={item.order_id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.order_id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.order_date}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{item.status}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.total_amount}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.buyer_id}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                            <button className="text-xs uppercase dark:text-white bg-green-500 mr-2" value={item.order_id} onClick={setUnfulfilled}>Unfulfilled</button> 
                            <button className="text-xs uppercase dark:text-white bg-green-500 mr-2" value={item.order_id} onClick={setShipped}>Shipped</button> 
                            <button className="text-xs uppercase dark:text-white bg-green-500" value={item.order_id} onClick={setDelivered}>Delivered</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default AllOrders