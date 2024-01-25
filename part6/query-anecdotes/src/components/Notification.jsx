import PropTypes from 'prop-types'
import NotificationContext from '../contexts/notificationContext'
import { useContext } from 'react'

const Notification = () => {
  const { notificationState } = useContext(NotificationContext)
  console.log('anecdote', notificationState)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notificationState.visible) return null

  return <div style={style}>{notificationState.message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default Notification
