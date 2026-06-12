import api from "./axios"

// login
export const loginUser = (data) => {
    return api.post("auth/login/", data)
}

// register
export const registerUser = (data) => {
    return api.post("auth/register/", data)
}



