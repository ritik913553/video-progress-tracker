import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
  
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated,setUser, setIsAuthenticated, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth state
export const useAuth = () => useContext(AuthContext);