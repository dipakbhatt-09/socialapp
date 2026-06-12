import { useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../../api/axios"

import "./search.css"

function Search() {

    const [q, setQ] = useState("")
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const [res, setRes] = useState({
        users: [],
        posts: []
    })

    const navigate = useNavigate()

    const search = async () => {

        if (!q.trim()) {
            setRes({
                users: [],
                posts: []
            })
            setSearched(false)
            return
        }

        try {

            setLoading(true)

            const response =
                await api.get(`search/?q=${q}`)

            setRes(response.data)

            setSearched(true)

        } catch (err) {

            console.log(err)

        } finally {

            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            search()
        }
    }

    return (
        <div className="search-page">

            <div className="search-container">

                <h2>Search Users</h2>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={q}
                        onChange={(e) =>
                            setQ(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        onClick={search}
                        disabled={loading}
                    >
                        {loading
                            ? "Searching..."
                            : "Search"}
                    </button>

                </div>

                <div className="search-results">

                    <h3>Users</h3>

                    {loading && (
                        <p className="empty-text">
                            Searching...
                        </p>
                    )}

                    {!loading &&
                        searched &&
                        res.users.length === 0 && (
                            <p className="empty-text">
                                No users found
                            </p>
                        )}

                    {!loading &&
                        res.users.map((user) => (

                            <div
                                key={user.id}
                                className="user-card"
                                onClick={() =>
                                    navigate(
                                        `/profile/${user.id}`
                                    )
                                }
                            >

                                <div className="avatar">
                                    {user.username[0].toUpperCase()}
                                </div>

                                <div>
                                    <strong>
                                        {user.username}
                                    </strong>
                                </div>

                            </div>

                        ))}

                </div>

            </div>

        </div>
    )
}

export default Search