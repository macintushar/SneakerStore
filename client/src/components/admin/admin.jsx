import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Admin(){
    const [data,setData] = useState(null);
    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/home")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, [data]);

    if(!data)
    {
        return(<h3 className="text-black">Loading...</h3>)
    }

    return(
        <>
        <div className="container mx-auto text-center">
            <h1 className="text-black">Dashboard</h1>
        </div>
        <div className="flex flex-wrap items-end justify-center space-x-1 mt-5">
            <Link to={"/admin/manage/orders"}>
                <button className="text-white">Current Orders</button>
            </Link>

            <Link to={"/admin/manage/sellers"}>
                <button className="text-white">Manage Sellers</button>
            </Link>

            <Link to={"/admin/manage/products"}>
                <button className="text-white">View Products</button>
            </Link>
            
            <Link to={"/admin/manage/inventory"}>
                <button className="text-white">View Inventory</button>
            </Link>
            
            <Link to={"/admin/manage/nft"}>
                <button className="text-white">Send NFT</button>
            </Link>
        </div>
        <div className="mt-10">
            <div className="flex justify-center space-x-5">
                <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Current Orders</h5>
                    <h1 className="text-center mt-5">{data.open}</h1>
                </div>
                <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Shipped Orders</h5>
                    <h1 className="text-center mt-5">{data.shipped}</h1>
                </div>
                <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Delivered Orders</h5>
                    <h1 className="text-center mt-5">{data.delivered}</h1>
                </div>
            </div>
        </div>
        <div className="mt-10">
            <div className="flex justify-center space-x-5">
                <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Total Order Revenue</h5>
                    <h1 className="text-center mt-5">
                        <span>&#8377;{data.total}</span>
                    </h1>
                </div>
            </div>
        </div>
      </>
    )
}

export default Admin