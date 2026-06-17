import { createContext, useState } from "react"
import { loginUser } from "../api/auth"

export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access") || null
    )

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access")
    )

    const login = async (username, password) => {
        try {
            const res = await loginUser({ username, password })

            const access = res.data.access
            const refresh = res.data.refresh

            localStorage.setItem("access", access)
            localStorage.setItem("refresh", refresh)

            setAccessToken(access)
            setIsAuthenticated(true)

            return { success: true }

        } catch (err) {
            return {
                success: false,
                error: err.response?.data || err.message
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setAccessToken(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider