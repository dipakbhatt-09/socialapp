import axios from "axios"

const api = axios.create({
    baseURL: "https://socialapp-3552.onrender.com/api/",
})

// Attach token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// Refresh token logic
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                const refresh = localStorage.getItem("refresh")

                const res = await axios.post(
                    "https://socialapp-3552.onrender.com/api/auth/token/refresh/",
                    { refresh }
                )

                const newAccess = res.data.access

                localStorage.setItem("access", newAccess)

                originalRequest.headers.Authorization = `Bearer ${newAccess}`

                return api(originalRequest)

            } catch (err) {
                localStorage.clear()
                window.location.href = "/login"
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)

export default api