import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminSignUp(){
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('http://65.1.76.191:5001/admin/sign-up')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);
  
    if (!data) {
      return <div>Loading data...</div>;
    }

    return(
        <div>
            <h1 className="text-black">{data}</h1>
            <Link to={'/admin/login'}>Already have an account? Login</Link>
        </div>
    )
}

export default AdminSignUp