import { useEffect, useState } from "react"
import { getNotifications } from "../api/notification"

function Notification() {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await getNotifications()
            setNotifications(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="notification">

            <h2>Notifications</h2>

            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((n) => (
                    <div key={n.id} className="noti-item">
                        <b>{n.sender}</b> 
                        {n.type === "like" ? " liked your post" : " commented on your post"}
                    </div>
                ))
            )}

        </div>
    )
}

export default Notification