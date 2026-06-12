import api from "./axios"

// like/unlike
export const toggleLike = (postId) => {
    return api.post(`likes/${postId}/`)
}