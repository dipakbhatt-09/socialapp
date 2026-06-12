import { useState, useEffect } from "react"

import { toggleLike } from "../../api/likes"
import { getComments, createComment } from "../../api/comments"

import "./postcard.css"

function PostCard({ post }) {

    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likes_count || 0)

    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)

    useEffect(() => {
        loadComments()
    }, [post.id])

    const loadComments = async () => {
        try {
            const res = await getComments(post.id)

            const data =
                res.data?.results ||
                res.data ||
                []

            setComments(Array.isArray(data) ? data : [])

        } catch (err) {
            console.log(err)
            setComments([])
        }
    }

    const handleLike = async () => {
        try {
            const res = await toggleLike(post.id)

            if (res.data.liked) {
                setLiked(true)
                setLikeCount(prev => prev + 1)
            } else {
                setLiked(false)
                setLikeCount(prev => Math.max(prev - 1, 0))
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleComment = async () => {
        if (!commentText.trim()) return

        try {
            await createComment({
                post: post.id,
                text: commentText
            })

            setCommentText("")
            loadComments()

        } catch (err) {
            console.log(err)
        }
    }

    const handleShare = () => {
        const link = `${window.location.origin}/post/${post.id}`
        navigator.clipboard.writeText(link)
        alert("Link copied 🔗")
    }

    const visibleComments = showAllComments ? comments : comments.slice(0, 1)

    return (
        <div className="postcard">

            {/* HEADER */}
            <div className="post-header">
                <div className="post-avatar">
                    {post.user?.[0]?.toUpperCase() || "U"}
                </div>

                <div>
                    <h4>{post.user}</h4>
                    <span>Just now</span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="post-content">
                <p>{post.content}</p>
            </div>

            {/* ACTIONS */}
            <div className="post-actions">

                <button
                    className={liked ? "like-btn active" : "like-btn"}
                    onClick={handleLike}
                >
                    ❤️ {likeCount}
                </button>

                <button className="comment-btn">
                    💬 {comments.length}
                </button>

                <button className="share-btn" onClick={handleShare}>
                    📤 Share
                </button>

            </div>

            {/* COMMENT INPUT */}
            <div className="comment-box">
                <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={handleComment}>Post</button>
            </div>

            {/* COMMENTS */}
            <div className="comment-list">

                {visibleComments.map((c) => (
                    <div key={c.id} className="comment-item">
                        <b>{c.user}</b> {c.text}
                    </div>
                ))}

                {comments.length > 1 && (
                    <p
                        className="view-more"
                        onClick={() => setShowAllComments(!showAllComments)}
                    >
                        {showAllComments ? "Hide comments" : "View all comments"}
                    </p>
                )}

            </div>

        </div>
    )
}

export default PostCard