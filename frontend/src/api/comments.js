import api from "./axios"

// get comments of post
export const getComments = (postId) => {
    return api.get(`comments/post/${postId}/`)
}

// create comment
export const createComment = (data) => {
    return api.post("comments/create/", data)
}