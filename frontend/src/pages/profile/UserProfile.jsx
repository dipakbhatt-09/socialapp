import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfile } from "../../api/profile"
import "./profile.css"

function UserProfile() {

    const { id } = useParams()

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const BASE = "http://127.0.0.1:8000"

    const fetchProfile = async () => {
        try {
            const res = await getUserProfile(id)
            setProfile(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [id])

    if (loading) return <h2>Loading...</h2>

    if (!profile) return <h2>No profile found</h2>

    return (
        <div className="profile-page">

            <div className="cover-container">

                <img
                    className="cover-img"
                    src={
                        profile.cover_image
                            ? `${BASE}${profile.cover_image}`
                            : "https://images.unsplash.com/photo-1503264116251-35a269479413"
                    }
                    alt="cover"
                />

                <img
                    className="avatar"
                    src={
                        profile.image
                            ? `${BASE}${profile.image}`
                            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                />

            </div>

            <div className="info-card">

                <h2>@{profile.username}</h2>
                <p>{profile.email}</p>

                <p><b>Bio:</b> {profile.bio}</p>
                <p><b>Education:</b> {profile.education}</p>
                <p><b>Location:</b> {profile.location}</p>
                <p><b>Website:</b> {profile.website}</p>

            </div>

        </div>
    )
}

export default UserProfile