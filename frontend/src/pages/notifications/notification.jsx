import { useEffect, useState } from "react"
import { getNotifications } from "../../api/notification"
import "./notification.css"

function Notification() {

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadNotifications()
    }, [])

    const loadNotifications = async () => {
        try {
            const data = await getNotifications()

            if (Array.isArray(data)) {
                setNotifications(data)
            } else {
                setNotifications([])
            }

        } catch (err) {
            console.log(err)
            setNotifications([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="notification">

            <h2>Notifications</h2>

            {loading ? (
                <p>Loading...</p>
            ) : notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((n) => (
                    <div key={n.id} className="noti-item">

                        <b>{n.sender_name}</b>{" "}
                        {n.type === "like"
                            ? " liked your post"
                            : " commented on your post"}

                    </div>
                ))
            )}

        </div>
    )
}

export default Notification