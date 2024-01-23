const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        message: action.message,
        visible: true,
      }

    case 'HIDE_NOTIFICATION':
      return { ...state, message: '', visible: false }
    default:
      return state
  }
}

export default notificationReducer
