import api from "./axios"

export const toggleFollow = (userId) => {
    return api.post(`follows/${userId}/`)
}

export const getFollowStatus = (userId) => {
    return api.get(`follows/status/${userId}/`)
}