import React, { useState } from 'react'
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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username:{' '}
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
          <br />
          Password:{' '}
          <input
            type='text'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
