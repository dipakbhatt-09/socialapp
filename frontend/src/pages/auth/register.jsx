import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { registerUser } from "../../api/auth"
import "./register.css"

function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {

        e.preventDefault()

        try {

            await registerUser({
                username,
                email,
                password
            })

            alert("Register Success 🚀")

            navigate("/login")

        } catch (error) {

            console.log("REGISTER ERROR:", error.response?.data)

            alert(
                JSON.stringify(
                    error.response?.data
                )
            )
        }
    }

    return (
        <div className="register-container">

            <form
                className="register-form"
                onSubmit={handleRegister}
            >

                <h1>Register</h1>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Create Account
                </button>

                <p className="auth-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    )
}

export default Register