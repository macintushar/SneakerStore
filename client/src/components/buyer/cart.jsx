import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import DeleteBtn from "./buttons/deleteBtn";
import PlusQty from "./buttons/plusQty";
import MinusQty from "./buttons/minusQty";

function Cart() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('cart')));

    var uid = window.sessionStorage.getItem("token");
    
    useEffect(() => {
        console.log(data)
    }, [data]);

    function updateQuantity(productName, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let product = cart.find(item => item.name === productName);
      
        if (product) {
          product.quantity = quantity;
        }
      
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function placeOrder(e) {
        e.preventDefault();

        var sku = e.target.sku.value;

        const product = { name: data.product_name, sku: data.sku, size: size, price: price };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
          console.log("exists")
        } 
        
        else {
          console.log("No exists")
        }
    
        alert("Added product to cart!")
    }

    if (!data) {
        return(
            <div className="text-black text-center h-screen">
                <h1>No products in cart.</h1>
                <Link to="/products">
                    <h2>Click here to shop</h2>
                </Link>
            </div>

        )
    }

    return(
        <>
            <div className="container mx-auto">
            <form onSubmit={placeOrder}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase text-gray-400 border-gray-400 border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-800">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-700">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-800">
                                    Size
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-700">
                                    Price
                                </th>
                                <th scope="col" className="px-4 py-3 bg-gray-800"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr className="border-b border-gray-600" key={item.sku}>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white bg-gray-800">{item.name}</th>
                                    <td className="px-6 py-4 bg-gray-700">
                                        <MinusQty sku={item.sku} />
                                        &nbsp;
                                        <b>{item.quantity}</b>
                                        &nbsp;&nbsp;
                                        <PlusQty sku={item.sku} />
                                    </td>
                                    <td className="px-6 py-4 bg-gray-800">{item.size}</td>
                                    <td className="px-6 py-4 bg-gray-700">&#8377;{item.price}</td>
                                    <td className="px-4 py-4 bg-gray-800">
                                        <DeleteBtn sku={item.sku} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br></br>

                <Link to='/checkout'>
                    <button type="submit" className="bg-blue-400 px-5 py-3 text-center text-xs uppercase">
                        <b className="text-white">PLACE ORDER</b>
                    </button>
                </Link>
            </form>
            </div>
        </>
    )
}

export default Cart