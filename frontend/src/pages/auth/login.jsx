import { useState } from "react"
import { loginUser } from "../../api/auth"
import { useNavigate, Link } from "react-router-dom"
import "./login.css"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await loginUser({
                username,
                password
            })

            localStorage.setItem("token", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)

            alert("Login Success")

            navigate("/")

        } catch (error) {
            console.log(error.response?.data)
            alert("Login Failed")
        }
    }

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleLogin}>

                <h1>Login</h1>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                <p className="auth-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    )
}

export default Login