import { useState } from "react";
import '../index.css';

function Checkout() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('cart')));
    const [orderID,setOrderID] = useState();
    var oid;
    async function placeOrder(event) {
        event.preventDefault();
        
        var card_number = event.target.cardnumber.value;
        var expiry = event.target.expiry.value;
        var cvc = event.target.cvc.value;
        var wallet_address = event.target.wallet_address.value;

        var name = event.target.name.value;
        var email = event.target.email.value;
        var phone = event.target.phone.value;
        var address = event.target.address.value;
        var city = event.target.city.value;
        var state = event.target.state.value;
        var zip = event.target.zip.value;

        var cart = data;
        var uid = sessionStorage.getItem('token');

        console.log(card_number,expiry,cvc)
        console.log(name,email,phone,address,city,state,zip)

        var orderDetails = 
        {
            "user_id": uid,
            "cart": cart,
            "cardnumber":card_number,
            "expiry":expiry,
            "cvc":cvc,
            "wallet_address":wallet_address,
            "name":name,
            "email":email,
            "phone":phone,
            "address":address,
            "city":city,
            "state":state,
            "zip":zip
        }
        
        const response = await fetch("http://65.1.76.191:5001/checkout", {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(orderDetails),})
        .catch(error => console.error(error));

        const order_data = await response.json();
        console.log(order_data[0].order_id)
        oid = order_data[0].order_id;

        localStorage.removeItem('cart')
        window.location.href = '/bill/'+oid;
    }

    return(
        <div className="text-black mx-auto">
            <h1 className="text-center">Checkout</h1>
            <div class="grid grid-cols-2">
                <div class="bg-white border-r border-gray-400 border-r-4" style={{marginLeft:"100px"}}>
                    <h1 className="text-center">Customer Details</h1>
                    <form style={{marginRight:"50px"}} onSubmit={placeOrder}>
                        <h2 class="text-xl font-bold mb-4">Payment Information</h2>
                        <div class="bg-white my-4 shadow p-8 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">1</div>
                                <h2 class="text-lg">Your Payment Information</h2>
                            </div>

                            <div class="w-full">
                                <label for="cardnumber" class="block text-sm mb-2">Credit Card</label>
                                <div class="flex">
                                    <input type="text" id="cardnumber" class="w-4/6 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="Card Number" maxLength="16" />
                                    <input type="text" id="expiry" class="w-1/6 inline-block text-sm bg-grey-light text-grey-darkest p-3 focus:outline-none mr-1" placeholder="MM / YY" maxLength="5" />
                                    <input type="text" id="cvc" class="w-1/6 inline-block text-sm bg-grey-light text-grey-darkest rounded-r p-3 focus:outline-none mr-1" placeholder="CVC" maxLength="3" />
                                </div>

                                <label for="wallet_address" class="block text-sm mt-4 mb-2">Crypto Wallet Address</label>
                                <div className="flex">
                                    <input type="text" id="wallet_address" class="w-4/6 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="NFT Wallet Address" />
                                </div>
                            </div>
                        </div>
                        <div class="bg-white my-4 shadow p-8 rounded-lg">
                            <div class="flex items-center mb-4">
                                <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">2</div>
                                <h2 class="text-lg">Your Contact Information</h2>
                            </div>

                            <div class="w-full">
                                <div class="flex mb-2">
                                    <input type="text" id="name" class="w-1/3 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="Name" />
                                    <input type="text" id="email" class="w-1/3 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none" placeholder="Email" />
                                    <input type="text" id="phone" class="w-1/3 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="Phone" />
                                </div>
                                <input type="text" id="address" class="w-full mb-2 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="Address" />
                                <div class="flex mb-2">
                                    <input type="text" id="city" class="w-1/3 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="City" />
                                    <select class="border rounded w-1/3 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" id="state" name="state" required>
                                        <option value="">Select State/Union Territory</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Ladakh">Ladakh</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </select>
                                    <input type="text" id="zip" class="w-1/3 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none mr-1" placeholder="ZIP" />
                                </div>
                            </div>
                        </div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Place Order
                        </button>
                    </form>
                </div>
                <div class="bg-gray-100">
                    <h1 className="text-center">Cart</h1>
                    <div className="container w-2/3 mx-auto">
                    {data.map(item => (
                        <>
                        <div className="flex justify-between space-x-6 items-center p-6 bg-white checkout-card mt-3">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} className="rounded-full h-20 w-20" alt={item.sku} />
                                <div className="flex flex-col space-y-2">
                                    <span>
                                        <b>{item.name}</b>
                                    </span>
                                    <span>
                                        <b>Size:</b> {item.size}
                                    </span>
                                    <span>
                                        <b>Quantity:</b> {item.quantity}
                                    </span>
                                    <span className="text-right">
                                        <b>&#8377;{item.price}</b>
                                    </span>
                                </div>
                            </div>
                        </div>
                        </>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;