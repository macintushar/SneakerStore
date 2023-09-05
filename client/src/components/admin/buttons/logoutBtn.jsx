import { Link } from "react-router-dom"

function AdminLogoutBtn() {
    function handleLogout() {
        window.sessionStorage.removeItem("admin-token")
        window.location = "/admin"
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default AdminLogoutBtn