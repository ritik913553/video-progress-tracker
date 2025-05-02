import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import Login from "../pages/Login.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, allow access to the route
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, redirect to the login page
  return <Login />;
};

export default ProtectedRoute;