import { useState, useEffect } from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function EditSeller() {
    const [data,setData] = useState()

    const params = useParams();
    var id = params.id;
    console.log(id);

    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/sellers/users/edit/" + id)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(<h3 className="text-black text-center">Loading...</h3>)
    }

    async function handleEditSeller(event) {
        event.preventDefault();
        var sid = event.target.seller_id.value;
        var company_name = event.target.company_name.value;
        var company_description = event.target.company_description.value;
        var uid = event.target.user_id.value;
        var username = event.target.username.value;
        var password = event.target.password.value;
        var email = event.target.email.value;
        var phone = event.target.phone.value;
        var name = event.target.name.value;
        var address = event.target.address.value;

        console.log(sid,company_name,company_description,uid,username,password,email,phone,first_name,last_name,address)

        var productDetails = 
        {
            "seller_id": sid,
            "company_name": company_name,
            "company_description": company_description,
            "user_id": uid,
            "users": {
              "user_id": uid,
              "username": username,
              "password": password,
              "email": email,
              "phone": phone,
              "name": name,
              "address": address
            }
        }

        const response = await fetch("http://65.1.76.191:5001/admin/manage/sellers/users/edit/update/" + sid, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productDetails),
          });
      
        const result = await response.json();
    }

    function btnClick() {
        setTimeout(() => {
            alert("Edited")
            window.location = "http://localhost:5173/admin/manage/sellers/"
        }, "1000")
    }

    return (
    <>
        <div className="container mx-auto mt-10">
            <Link to="http://localhost:5173/admin/manage/sellers/">
                <img src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1681502937/SneakerStreet/assets/undo.png" width="2%" />
            </Link>
        </div>
        <div className="container mx-auto bg-gray-100 p-3 mt-2">
            {data.map(item => (
            <form onSubmit={handleEditSeller} key={item.product_id}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="seller_id">
                            Seller ID
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="seller_id" type="text" placeholder="Name"  value={item.seller_id} readOnly={true} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="company_name">
                            Company Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="company_name" type="text" placeholder="Name"  defaultValue={item.company_name} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="company_description">
                            Company Description
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="company_description" type="text" placeholder="This shoe is ..." defaultValue={item.company_description} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="user_id">
                            User ID
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="user_id" type="text" placeholder="Name"  value={item.user_id} readOnly={true} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" type="text" placeholder="This shoe is ..." defaultValue={item.users.username} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="text" placeholder="Name"  value={item.users.password} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                            Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first_name" type="text" placeholder="Name"  defaultValue={item.users.name} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" type="text" placeholder="This shoe is ..." defaultValue={item.users.address} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="text" placeholder="Name"  defaultValue={item.users.email} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" type="text" placeholder="This shoe is ..." defaultValue={item.users.phone} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"></div>
                </div>
                <br></br>
                <button className="w-full bg-green-500" type="submit" onClick={btnClick}>Edit Seller</button>
            </form>
            ))}
        </div>
    </>
    )
}

export default EditSeller