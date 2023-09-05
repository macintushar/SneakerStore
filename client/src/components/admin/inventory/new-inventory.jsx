import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function NewInventory() {
    const [data,setData] = useState()

    useEffect(() => {
        fetch("http://65.1.76.191:5001/datas/ids")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(<h3 className="text-black text-center">Loading...</h3>)
    }

    async function handleAddInventory(event) {
        event.preventDefault();
    
        var pid = event.target.product_id.value;
        var sku = event.target.sku.value;
        var size = event.target.size.value;
        var quantity = event.target.quantity.value;

        var productDetails = 
        {
            "product_id":pid,
            "sku":sku,
            "size":size,
            "quantity":quantity,
        }

        const response = await fetch("http://65.1.76.191:5001/admin/manage/inventory/add/" + pid, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productDetails),
          });
      
        const result = await response.json();
        alert("Added Inventory")
    }

    return (
    <>
        <div className="container mx-auto mt-10">
            <Link to="http://localhost:5173/admin/manage/inventory/">
                <img src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1681502937/SneakerStreet/assets/undo.png" width="2%" />
            </Link>
        </div>
        <div className="container mx-auto bg-gray-100 p-3 mt-10">
            <form onSubmit={handleAddInventory}>          
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="product_id">
                            Product ID
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="product_id">
                            {data.map(item => (
                                <option value={item.product_id}>{item.product_id} - {item.product_name} - {item.sku}</option>
                            ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sku">
                            SKU
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sku">
                            {data.map(item => (
                                <option value={item.sku}>{item.sku}</option>
                            ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="quantity" type="text" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="size">
                            Size
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="size" type="text" />
                    </div>
                </div>
                <br></br>
                <button className="w-full bg-green-500" type="submit">Add Product</button>
            </form>
        </div>
    </>
    )
}

export default NewInventory