import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SizesOption from "./sizes";

function Product_details() {
    console.log("HERE")
    const params = useParams();
    const id = params.id;
    
    var stock;
    const [data, setData] = useState({});

    useEffect(() => {
        fetch('http://65.1.76.191:5001/shoe/' + id)
        .then(response => response.json())
        .then(data => setData(data[0]))
    }, []);

    function addToCart(event) {
        event.preventDefault();
        var size = event.target.size.value;
        var price = data.current_price;

        const product = { name: data.product_name, sku: data.sku, size: size, price: price, original_price: price, image: data.image };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingProduct = cart.find(item => item.name === product.name && item.size === product.size);

        if (existingProduct) {
          existingProduct.quantity++;
          existingProduct.price = existingProduct.price + price;
        } 
        
        else {
          product.quantity = 1;
          cart.push(product);
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Added product to cart!")
    }

    if (!data) {
      return <div className="text-black">Loading data...</div>;
    }
    else {
        console.log(data)
        if(!data.inventory) {
            return("Loading")
        }
        if(data["inventory"].length>0) {
            stock = "In Stock";
        }
        if(data["inventory"].length<1) {
            stock = <span className="text-red-500">Not In Stock</span>
        }
    return (
        <div className="static">
            <div className="container mx-auto py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        <img src={data.image} alt={data.product_name} className="h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-black">{data.brand}</h1>
                        <h2 className="text-2xl font-semibold mb-4 text-black">{data.product_name}</h2>
                        <p className="text-gray-700 text-lg mb-4">{data.description}</p>
                        
                        <div className="flex items-center mb-4">
                            <span className="text-lg font-semibold mr-4 text-black" value={data.current_price}>&#8377;{data.current_price}</span>
                            <span className="text-green-500 text-lg font-semibold">{stock}</span>
                        </div>
                        <form onSubmit={addToCart}>
                            <SizesOption />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default Product_details;