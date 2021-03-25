const initialState = ''

const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FILTER':
			return action.data
		default:
			return state
	}
}

export function filterAnecdotes(filter) {
	return async (dispatch) => {
        dispatch(setFilter(filter))
	}
}

export const setFilter = (filter) => {
    return {
        type: 'FILTER',
        data: filter
    }
}

export default filterReducer
