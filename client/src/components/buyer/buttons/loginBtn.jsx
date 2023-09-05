import { Link } from "react-router-dom"

function LoginBtn() {
    return (
        <Link to="/login">
            <button className="bg-blue-600 text-white py-2 px-3">Login</button>
        </Link>
    )
}

export default LoginBtn