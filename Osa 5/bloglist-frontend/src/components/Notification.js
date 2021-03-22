import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, status }) => {
  if (message === '') {
    return null
  }

  return <div className={status}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Notification
