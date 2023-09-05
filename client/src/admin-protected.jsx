import { Navigate } from "react-router-dom";

var isLoggedIn = sessionStorage.getItem('admin-token');

const ProtectedAdmin = ({ children }) => {
    if (!isLoggedIn) {
        console.log(isLoggedIn);
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

export default ProtectedAdmin;
