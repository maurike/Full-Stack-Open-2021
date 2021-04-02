import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

const LoginForm = ({ setToken }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
            console.log(result.data)
			console.log('Login error')
		}
	})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('library-user-token', token)
		}
	}, [result.data]) // eslint-disable-line

	const submit = async (event) => {
		event.preventDefault()

		login({ variables: { username, password } })
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					Username:{' '}
					<input value={username} onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div>
					Password:{' '}
					<input value={password} onChange={({ target }) => setPassword(target.value)} />
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default LoginForm
