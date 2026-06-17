import axios from "axios"

const BASE_URL = "https://socialapp-3552.onrender.com/api/notifications/"

const getToken = () => localStorage.getItem("token")

export const getNotifications = async () => {
    const token = getToken()

    const res = await axios.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.data
}