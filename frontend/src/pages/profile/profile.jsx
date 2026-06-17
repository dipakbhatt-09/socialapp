import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
    getProfile,
    getUserProfile,
    updateProfile
} from "../../api/profile"

import {
    toggleFollow,
    getFollowStatus
} from "../../api/follows"

import "./profile.css"

function Profile() {

    const { id } = useParams()

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    const [bio, setBio] = useState("")
    const [education, setEducation] = useState("")
    const [location, setLocation] = useState("")
    const [website, setWebsite] = useState("")

    const [image, setImage] = useState(null)
    const [cover, setCover] = useState(null)

    // FOLLOW STATES
    const [following, setFollowing] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)

    const BASE = "https://socialapp-3552.onrender.com"

    //  FETCH PROFILE
    const fetchProfile = async () => {

        try {

            let res

            if (id) {
                res = await getUserProfile(id)
            } else {
                res = await getProfile()
            }

            setProfile(res.data)

            setBio(res.data.bio || "")
            setEducation(res.data.education || "")
            setLocation(res.data.location || "")
            setWebsite(res.data.website || "")

            setFollowersCount(res.data.followers_count || 0)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    // CHECK FOLLOW STATUS
    const checkFollowStatus = async () => {

        if (!id) return

        try {

            const res = await getFollowStatus(id)

            setFollowing(res.data.is_following)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [id])

    useEffect(() => {
        checkFollowStatus()
    }, [id])

    //  TOGGLE FOLLOW 
    const handleFollow = async () => {

        try {

            const res = await toggleFollow(id)

            setFollowing(res.data.following)
            setFollowersCount(res.data.followers_count)

        } catch (err) {
            console.log(err)
        }
    }

    // UPDATE PROFILE 
    const handleSave = async () => {

        try {

            const formData = new FormData()

            formData.append("bio", bio)
            formData.append("education", education)
            formData.append("location", location)
            formData.append("website", website)

            if (image) {
                formData.append("image", image)
            }

            if (cover) {
                formData.append("cover_image", cover)
            }

            await updateProfile(formData)

            setEditing(false)
            fetchProfile()

            alert("Profile updated")

        } catch (err) {
            console.log(err)
        }
    }

    if (loading) {
        return <h2 className="loading">Loading profile...</h2>
    }

    if (!profile) {
        return <h2>No profile found</h2>
    }

    const isOwnProfile = !id

    return (
        <div className="profile-page">

            {/* COVER */}
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

            {/* INFO */}
            <div className="info-card">

                <h2>@{profile.username}</h2>

                <p className="email">{profile.email}</p>

                {/* FOLLOW INFO */}
                {!isOwnProfile && (
                    <p>
                        Followers: {followersCount}
                    </p>
                )}

                <div className="info-grid">

                    <p><b>Bio:</b> {profile.bio || "No bio yet"}</p>
                    <p><b>Education:</b> {profile.education || "Not added"}</p>
                    <p><b>Location:</b> {profile.location || "-"}</p>
                    <p><b>Website:</b> {profile.website || "-"}</p>

                </div>

                {/* FOLLOW BUTTON */}
                {!isOwnProfile && (
                    <button
                        className="follow-btn"
                        onClick={handleFollow}
                    >
                        {following ? "Unfollow" : "Follow"}
                    </button>
                )}

                {/* EDIT BUTTON (ONLY OWN PROFILE) */}
                {isOwnProfile && (
                    <button
                        className="edit-btn"
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? "Cancel" : "Edit Profile"}
                    </button>
                )}

                {/* EDIT FORM */}
                {isOwnProfile && editing && (
                    <div className="edit-box">

                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Bio"
                        />

                        <input
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            placeholder="Education"
                        />

                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                        />

                        <input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Website"
                        />

                        <label>Profile Picture</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <label>Cover Photo</label>
                        <input
                            type="file"
                            onChange={(e) => setCover(e.target.files[0])}
                        />

                        <button
                            className="save-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    </div>
                )}

            </div>

        </div>
    )
}

export default Profile