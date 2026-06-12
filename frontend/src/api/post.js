import api from "./axios"

// get posts
export const getPosts = () => {
    return api.get("posts/")
}

// create post
export const createPost = (data) => {
    return api.post("posts/", data)
}