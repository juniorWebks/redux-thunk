const SET_USERS = 'fetchUsers/SET_USERS'

export const setUsersAction = data => ({
    type: SET_USERS,
    data
})

const initialState = {
    users: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.data
            }
        default:
            return state
    }
}