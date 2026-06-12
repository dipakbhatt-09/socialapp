import CreatePost from "../../components/posts/createpost"
import PostList from "../../components/posts/postlist"
import "./home.css"

function Home() {

    return (
        <div className="home">

            <div className="feed-section">

                <CreatePost />

                <PostList />

            </div>

        </div>
    )
}

export default Home