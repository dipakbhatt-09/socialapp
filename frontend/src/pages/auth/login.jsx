import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./login.css"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()

        const result = await login(username, password)

        if (result.success) {
            alert("Login Success")
            navigate("/")
        } else {
            console.log(result.error)
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