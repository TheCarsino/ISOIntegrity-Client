import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, role }) => {
  const { isLoggedIn, userData } = useAuth();

  const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
  const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

  if (
    !storedIsLoggedIn ||
    !role.some((allowedRole) => allowedRole === storedUserData.Role.nombre)
  ) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  role: PropTypes.arrayOf.string,
};

export default PrivateRoute;
