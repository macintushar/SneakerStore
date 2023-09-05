import { Navigate } from "react-router-dom";

var isLoggedIn = sessionStorage.getItem('token');

const Protected = ({ children }) => {
    if (!isLoggedIn) {
        console.log(isLoggedIn);
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default Protected;