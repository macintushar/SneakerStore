import { Link } from "react-router-dom"

function AdminLoginBtn() {
    return (
        <Link to="/admin/login">
            <button className="bg-blue-600 text-white">Login</button>
        </Link>
    )
}

export default AdminLoginBtn