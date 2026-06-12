import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

    
    const token = localStorage.getItem("token")

    // if no token → send login page
    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute