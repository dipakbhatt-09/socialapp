import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000/api/notifications/"

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