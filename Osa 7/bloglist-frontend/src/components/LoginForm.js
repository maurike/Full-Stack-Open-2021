import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()

    login({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' value={username} onChange={handleUsernameChange} />
      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='text' value={password} onChange={handlePasswordChange} />
      </Form.Group>
      <Button id='login-button' type='submit'>
        Login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
