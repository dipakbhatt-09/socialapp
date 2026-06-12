import { useState } from "react"
import { createPost } from "../../api/post"
import "./createpost.css"

function CreatePost() {

    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePost = async (e) => {
        e.preventDefault()

        if (!content.trim()) {
            return alert("Write something first ❌")
        }

        setLoading(true)

        try {
            await createPost({
                title: content,
                content: content
            })

            setContent("")
            window.location.reload()

        } catch (error) {
            console.log(error)
            alert("Post failed ❌")
        }

        setLoading(false)
    }

    return (
        <div className="createpost">

            <div className="createpost-top">

                {/* ❌ AVATAR REMOVED */}

                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

            </div>

            <div className="createpost-bottom">
                <button onClick={handlePost} disabled={loading}>
                    {loading ? "Posting..." : "Create Post"}
                </button>
            </div>

        </div>
    )
}

export default CreatePost