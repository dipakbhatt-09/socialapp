import { useEffect, useState } from "react"

// API FUNCTION
import { getPosts } from "../../api/post"

// POST CARD COMPONENT
import PostCard from "./postcard"

// CSS
import "./postlist.css"

function PostList() {

    // STORE POSTS
    const [posts, setPosts] = useState([])

    // LOADING STATE
    const [loading, setLoading] = useState(true)

    // FETCH POSTS FROM BACKEND
    const fetchPosts = async () => {

        try {

            setLoading(true)

            // API CALL
            const res = await getPosts()

            console.log("POSTS:", res.data)

            // SAVE ONLY RESULTS ARRAY
            setPosts(res.data.results)

        } catch (error) {

            console.log(error.response?.data)

        } finally {

            setLoading(false)
        }
    }

    // LOAD POSTS ON PAGE LOAD
    useEffect(() => {

        fetchPosts()

    }, [])

    return (

        <div className="postlist">

            {/* TITLE */}
            <div className="feed-header">

                <h2>News Feed 🚀</h2>

            </div>

            {/*  LOADING  */}

            {loading && (

                <div className="loading-box">

                    Loading posts...

                </div>
            )}

            {/*  EMPTY STATE */}

            {!loading && posts.length === 0 && (

                <div className="empty-post">

                    No posts available

                </div>
            )}

            {/*  POSTS */}

            {!loading && posts.map((post) => (

                <PostCard
                    key={post.id}
                    post={post}
                />

            ))}

        </div>
    )
}

export default PostList