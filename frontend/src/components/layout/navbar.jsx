import { useEffect, useState } from "react"
import { Home, Search, Bell, User, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"
import "./Navbar.css"

function Navbar() {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [profile, setProfile] = useState(null)

    const fetchProfile = async () => {
        try {
            const res = await api.get("auth/profile/")
            setProfile(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (token) fetchProfile()
    }, [token])

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    const BASE = "http://127.0.0.1:8000"

    return (
        <div className="navbar">

            {/* LEFT */}
            <div className="nav-left" onClick={() => navigate("/")}>
                <div className="logo">Social Blog</div>

                {profile && (
                    <div
                        className="mini-profile"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate("/profile")
                        }}
                    >
                        <img
                            src={
                                profile.image
                                    ? `${BASE}${profile.image}`
                                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="me"
                        />
                    </div>
                )}
            </div>

            {/* CENTER */}
            {token && (
                <div className="nav-center">

                    <div onClick={() => navigate("/")} className="nav-item">
                        <Home />
                    </div>

                    <div onClick={() => navigate("/search")} className="nav-item">
                        <Search />
                    </div>

                    <div onClick={() => navigate("/notifications")} className="nav-item">
                        <Bell />
                    </div>

                    <div onClick={() => navigate("/profile")} className="nav-item">
                        <User />
                    </div>

                </div>
            )}

            {/* RIGHT */}
            {token && (
                <button onClick={logout} className="logout-btn">
                    <LogOut />
                </button>
            )}

        </div>
    )
}

export default Navbar