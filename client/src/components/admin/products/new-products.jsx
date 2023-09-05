import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function NewProduct() {
    const [data,setData] = useState()

    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/sellers/all")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(<h3 className="text-black text-center">Loading...</h3>)
    }

    async function handleAddProduct(event) {
        event.preventDefault();
        var name = event.target.product_name.value;
        var description = event.target.description.value;
        var image = event.target.image.value;
        var category = event.target.category.value;
        var sku = event.target.sku.value;
        var current_price = event.target.current_price.value;
        var original_price = event.target.original_price.value;
        var discount = event.target.discount.value;
        var brand = event.target.brand.value;
        var seller = event.target.seller.value;

        console.log(name,description,image,category,sku,current_price,original_price,discount,brand,seller)

        var productDetails = 
        {
            "product_name":name,
            "description":description,
            "image":image,
            "category":category,
            "sku":sku,
            "current_price":current_price,
            "original_price":original_price,
            "discount":discount,
            "brand":brand,
            "seller":seller
        }

        const response = await fetch("http://65.1.76.191:5001/admin/manage/products/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productDetails),
          });
      
        const result = await response.json();
    }

    return (
    <>
        <div className="container mx-auto mt-10">
            <Link to="http://localhost:5173/admin/manage/products/">
                <img src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1681502937/SneakerStreet/assets/undo.png" width="2%" />
            </Link>
        </div>
        <div className="container mx-auto bg-gray-100 p-3 mt-10">
            <form onSubmit={handleAddProduct}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="product_name">
                            Product Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="product_name" type="text" placeholder="Name" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text" placeholder="This shoe is ..." />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                            Image URL
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="image" type="text" placeholder="https://res.cloudinary.com/" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                            Category
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category">
                            <option>Casual</option>
                            <option>Basketball</option>
                            <option>Running</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sku">
                            SKU
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sku" type="text" placeholder="Brand-Product" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="current_price">
                            Current Price
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="current_price" type="text" placeholder="XXXXX" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="original_price">
                            Original Price
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="original_price" type="text" placeholder="XXXXX" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="discount">
                            Discount
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="discount" type="text" />
                    </div>
                </div>
                                
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="brand">
                            Brand
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="brand" type="text" />
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="seller">
                            Seller
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="seller">
                            {data.map(item => (
                                <option value={item.seller_id}>{item.company_name}</option>
                            ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0"></div>
                </div>
                <br></br>
                <button className="w-full bg-green-500" type="submit">Add Product</button>
            </form>
        </div>
    </>
    )
}

export default NewProduct