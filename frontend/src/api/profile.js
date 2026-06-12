import api from "./axios"


// MY PROFILE
export const getProfile = () => {
    return api.get("auth/profile/")
}


// OTHER USER PROFILE
export const getUserProfile = (id) => {
    return api.get(`auth/profile/${id}/`)
}


// UPDATE PROFILE
export const updateProfile = (data) => {
    return api.patch("auth/profile/", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}