const initialState = ''

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return action.data
		case 'HIDE_NOTIFICATION':
			return initialState
		default:
			return state
	}
}

export function showNotificationWithTimeout(type, content) {
	return async (dispatch) => {
		if (type === 'add') {
			dispatch(showNotification('Anecdote \'' + content + '\' added'))
		} else if (type === 'vote') {
			dispatch(showNotification('Anecdote \'' + content.content + '\' liked'))
		}

		setTimeout(() => {
			dispatch(hideNotification())
		}, 5000)
	}
}

export const showNotification = (notification) => {
	return {
		type: 'SHOW_NOTIFICATION',
		data: notification
	}
}

export const hideNotification = () => {
	return {
		type: 'HIDE_NOTIFICATION'
	}
}

export default notificationReducer
