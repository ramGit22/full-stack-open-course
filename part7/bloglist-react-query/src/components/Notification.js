import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../features/notificationSlice'

const Notification = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(
    (state) => state.notifications.notifications
  )

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  })
  return (
    <div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          {notification.title}
        </div>
      ))}
    </div>
  )
}

export default Notification
