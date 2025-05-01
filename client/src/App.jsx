import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import { useAuth } from "./context/AuthProvider";
import Loader from "./components/Loader";
function App() {
    useLoadingWithRefresh();
    const { loading } = useAuth();


    return loading ? (
        <Loader />
    ) : (
        <>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/signup" element={<Signup />} />
                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Toaster position="bottom-left" reverseOrder={false} />
        </>
    );
}

export default App;
