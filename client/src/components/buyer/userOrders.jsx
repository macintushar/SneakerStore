import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserOrders() {
    const [data,setData] = useState()
    var user_id = sessionStorage.getItem('token')
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/user/orders/" + user_id)
        .then(response => response.json())
        .then(data => setData(data))
        .then(console.log(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(
            <>
                <h1 className="text-black text-center text-4xl text-green-800">Order History</h1>
                <h2 className="text-black text-center">No Orders Placed</h2>
            </>
        )
    }

    return(
        <>
            <h1 className="text-black text-center text-4xl text-green-800">Order History</h1>
            <div className="flex flex-col text-black mx-auto overflow-auto w-5/6 mt-10">
                <table className="text-left text-sm font-dark table-auto overflow-scroll">
                    <thead className="border-b font-medium">
                        <tr>
                            <th scope="col" className="px-6 py-4">Order ID</th>
                            <th scope="col" className="px-6 py-4">Order Timestamp</th>
                            <th scope="col" className="px-6 py-4">Order Amount</th>
                            <th scope="col" className="px-6 py-4">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(order => (
                            <tr className="border-b" key={order.order_id}>
                                <Link to={'/bill/' + order.order_id}>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-black hover:text-blue-300 underline" data-te-toggle="tooltip" title="Bill">
                                        {order.order_id}
                                    </td>
                                </Link>
                                <td className="whitespace-nowrap px-6 py-4">{order.order_date}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{order.total_amount}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserOrders;