import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return isAuthenticated ? children : <Navigate to='/login' />;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}