import { useState, useEffect } from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function EditInventory() {
    const [data,setData] = useState()

    const params = useParams();
    var id = params.id;
    console.log(id);

    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/inventory/edit/" + id)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(<h3 className="text-black text-center">Loading...</h3>)
    }

    async function handleEditProduct(event) {
        event.preventDefault();
        var iid = event.target.inventory_id.value;
        var pid = event.target.product_id.value;
        var sku = event.target.sku.value;
        var size = event.target.size.value;
        var quantity = event.target.quantity.value;

        var productDetails = 
        {
            "product_id":pid,
            "inventory_id":iid,
            "sku":sku,
            "size":size,
            "quantity":quantity,
        }

        const response = await fetch("http://65.1.76.191:5001/admin/manage/inventory/edit/update/" + iid, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productDetails),
          });
      
        const result = await response.json();
        alert("Edited Inventory")
    }

    return (
    <>
        <div className="container mx-auto mt-10">
            <Link to="http://localhost:5173/admin/manage/inventory/">
                <img src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1681502937/SneakerStreet/assets/undo.png" width="2%" />
            </Link>
        </div>
        <div className="container mx-auto bg-gray-100 p-3 mt-2">
            {data.map(item => (
            <form onSubmit={handleEditProduct} key={item.product_id}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="product_id">
                            Product ID
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="inventory_id" type="text" placeholder="Name"  value={item.inventory_id} readOnly={true} />
                    </div>
                    <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inventory_id">
                            Inventory ID
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="product_id" type="text" placeholder="Name"  value={item.product_id} readOnly={true} />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="quantity" type="number" placeholder="0" defaultValue={item.quantity} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="size">
                            Size
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="size" type="number" placeholder="10" defaultValue={item.size} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sku">
                            SKU
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sku" type="text" placeholder="Brand-Product" defaultValue={item.sku} readOnly={true} />
                    </div>
                </div>
                <br></br>
                <button className="w-full bg-green-500" type="submit">Edit Product</button>
            </form>
            ))}
        </div>
    </>
    )
}

export default EditInventory