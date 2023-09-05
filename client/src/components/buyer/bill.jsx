import { useEffect, useState } from "react";
import { useParams } from "react-router";


function Bill() {
    const [data,setData] = useState(null)
    
    const params = useParams();
    const oid = params.id;
    let discount = 0;

    useEffect(() => {
        fetch('http://65.1.76.191:5001/order/' + oid)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
      }, []);

    if(!data) {
        return(
            <p className="text-black text-xl text-center">Generating Bill...</p>
        )
    }
    if(data) {
        for(let df=0; df<data.length; df++) {
            console.log(data[df].product.discount);
            discount = discount + data[df].product.discount;
        }
        console.log(data)
    }
    return(
        <>
            <div className="flex justify-center items-center text-gray-900">
            <div className="rounded-md relative w-3/4 shadow-2xl bg-gray-100 p-2">
                <div className="py-2">
                    <div className="text-center text-xl font-bold">ORDER</div>
                    <div className="text-center text-xs font-bold">Thanks for ordering from Sneaker Street!</div>
                </div>
                <div className="text-center text-xs font-bold mb-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
                <div className="text-xs pl-2">
                <div className="text-xs mb-1"><b>Customer ID:</b> {data[0].orders.buyer_id}</div>
                <div className="text-xs mb-1"><b>Address:</b> {data[0].orders.address}</div>
                <div className="text-xs mb-1"><b>City:</b> {data[0].orders.city}</div>
                <div className="text-xs mb-1"><b>State:</b> {data[0].orders.state}</div>
                <div className="text-xs mb-1"><b>Zip:</b> {data[0].orders.zip}</div>
                </div>
                <div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
                <div className="flex text-sm pt-1 px-1">
                    <span className="w-4/6"><b>Name</b></span>
                    <span className="w-1/6 text-right"><b>Price</b></span>
                    <span className="w-1/6 text-right"><b>Number</b></span>
                </div>
                <div className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                    {data.map(item => (
                        <div className="flex justify-between text-sm" key={item.sku}>
                            <span className="w-4/6 truncate">{item.product.product_name}</span>
                            <span className="w-1/6 text-right">&#8377;{item.product.current_price}</span>
                            <span className="w-1/6 text-right">{item.quantity}</span>
                        </div>
                    ))}
                </div>
                </div>
                <div className="text-xs">
                <div className="mb-1"><b>Discount:</b> &#8377;{discount}</div>
                <div className="mb-52"><b>Remark:</b> --</div>
                <div className="text-right">
                    <div><b>Order Timestamp:</b> {data[0].orders.order_date}</div>
                    <div className="font-bold text-sm">Total: &#8377;{data[0].orders.total_amount}</div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Bill;