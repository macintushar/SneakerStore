import { Link } from "react-router-dom"

function LogoutBtn() {
    function handleLogout() {
        window.sessionStorage.removeItem("token")
        window.location = "/"
    }
    return (
        <button onClick={handleLogout} className="bg-blue-600 text-white py-2 px-3">Logout</button>
    )
}

export default LogoutBtn