import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function AllSellers(){
    const [data,setData] = useState()
    
    useEffect(() => {
        fetch("http://65.1.76.191:5001/admin/manage/sellers/users/all")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, [data]);

    if(!data) {
        return(<h3 className="text-black">"Loading.."</h3>)
    }

    const handleEditClick = (id) => {
        console.log("Editing Seller ID:",id)
    }

    async function handleDelete(event) {
        event.preventDefault();
        
        var pid = event.target.value;
        console.log(pid)

        fetch("http://65.1.76.191:5001/admin/manage/sellers/delete/" + pid)
        .then(response => response.json())
        .then(alert("Deleted product with ID: " + pid))
        .catch(error => console.error(error));
    }

    return(
        <>
        <div className="flex flex-col text-black container mx-auto">
            <table className="min-w-full text-left text-sm font-dark">
                <thead className="border-b font-medium">
                    <tr>
                        <th scope="col" className="px-6 py-4">Seller ID</th>
                        <th scope="col" className="px-6 py-4">Seller Name</th>
                        <th scope="col" className="px-6 py-4">Seller Username</th>
                        <th scope="col" className="px-6 py-4">Seller Password</th>
                        <th scope="col" className="px-6 py-4">Seller Phone Number</th>
                        <th scope="col" className="px-6 py-4">Seller Email</th>
                        <th scope="col" className="px-6 py-4">Seller Name</th>
                        <th scope="col" className="px-6 py-4">Seller Address</th>
                        <th scope="col" className="px-6 py-4">Edit</th>
                        <th scope="col" className="px-6 py-4">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr className="border-b" key={item.seller_id}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item.seller_id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.company_name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.users.username}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.users.password}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.users.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.users.phone}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.users.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{item.users.address}</td>
                            
                            <td className="whitespace-nowrap px-6 py-4">
                                <Link to={"/admin/manage/sellers/edit/" + item.seller_id}>
                                    <button className="text-xs uppercase dark:text-white" style={{backgroundColor:"green"}}>Edit</button> 
                                </Link>
                            </td>
                            
                            <td className="whitespace-nowrap px-6 py-4">
                                <button className="text-xs uppercase dark:text-white bg-danger" style={{backgroundColor:"red"}} value={item.seller_id} onClick={handleDelete}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default AllSellers