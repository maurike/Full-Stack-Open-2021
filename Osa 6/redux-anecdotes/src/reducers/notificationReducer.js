const initialState = ''

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			clearTimeout(state.seconds)
			return action.data.notification
		case 'HIDE_NOTIFICATION':
			return initialState
		default:
			return state
	}
}

export const setNotification = (notification, seconds) => {
	return async (dispatch) => {
		dispatch({
			type: 'SHOW_NOTIFICATION',
			data: {
				notification,
				seconds: setTimeout(() => {
					dispatch(hideNotification())
				}, seconds * 1000)
			}
		})
	}
}

export const hideNotification = () => {
	return {
		type: 'HIDE_NOTIFICATION'
	}
}

export default notificationReducer
