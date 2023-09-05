import { useEffect, useState } from "react";

function Profile() {
    const [data,setData] = useState()
    var user_id = sessionStorage.getItem('token')
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/user/" + user_id)
        .then(response => response.json())
        .then(data => setData(data))
        .then(console.log(data))
        .catch(error => console.error(error));
    }, []);

    if(!data) {
        return(<h1>Loading..</h1>)
    }

    return(
        <>
            <h1 className="text-black text-center text-4xl text-green-800">User Profile</h1>
            <div class="flex items-center justify-center mb-10">
            <div class="bg-white shadow-xl rounded-lg py-3">
                <div class="photo-wrapper p-2">
                    <img class="w-32 h-32 rounded-full mx-auto" src={data[0].profile_picture} alt="John Doe" />
                </div>
                <div class="p-2">
                    <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{data[0].username}</h3>
                    <table class="text-xs my-3">
                        <tbody>
                            <tr>
                            <td class="px-2 py-2 text-gray-800 font-semibold">Address</td>
                            <td class="px-2 py-2 text-gray-500">{data[0].address}</td>
                        </tr>
                        <tr>
                            <td class="px-2 py-2 text-gray-800 font-semibold">Phone</td>
                            <td class="px-2 py-2 text-gray-500">{data[0].phone}</td>
                        </tr>
                        <tr>
                            <td class="px-2 py-2 text-gray-800 font-semibold">Email</td>
                            <td class="px-2 py-2 text-gray-500">{data[0].email}</td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
            </div>
            
        </>
    )
}

export default Profile;