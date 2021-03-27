const initialState = ''
let timeOut = ''

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

export const setNotification = (notification, seconds) => {
	return async (dispatch) => {
		clearTimeout(timeOut)

		timeOut = setTimeout(() => {
			dispatch(hideNotification())
		}, seconds * 1000)

		dispatch({
			type: 'SHOW_NOTIFICATION',
			data: notification
		})
	}
}

export const hideNotification = () => {
	return {
		type: 'HIDE_NOTIFICATION'
	}
}

export default notificationReducer
