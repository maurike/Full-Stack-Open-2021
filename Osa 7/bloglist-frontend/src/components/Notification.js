import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, status }) => {
  if (message === '') {
    return null
  }

  return <div className='container'>{message && <Alert variant={status}>{message}</Alert>}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Notification
