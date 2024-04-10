import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../features/notificationSlice'

const Notification = () => {
  const dispatch = useDispatch()
  const { notification } = useSelector((state) => state.notification)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }, [dispatch, notification])
  return (
    <div>
      {notification.map((message, index) => (
        <div key={index}>{`${message} added`}</div>
      ))}
    </div>
  )
}

export default Notification
