import PropTypes from 'prop-types'

const Notification = ({ message, visible }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!visible) return null

  return <div style={style}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default Notification
