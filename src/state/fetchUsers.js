const SET_USERS = 'fetchUsers/SET_USERS'
const USERS_STARTED_LOADING = 'fetchUsers/USERS_STARTED_LOADING'
const USERS_STOPPED_LOADING = 'fetchUsers/USERS_STOPPED_LOADING'

export const usersStartedLoadingAction = () => ({ type: USERS_STARTED_LOADING })
export const usersStoppedLoadingAction = () => ({ type: USERS_STOPPED_LOADING })

export const setUsersAction = data => ({
    type: SET_USERS,
    data
})

export const fetchUsersAction = () => (dispatch, getState) => {
    dispatch(usersStartedLoadingAction())
    fetch('https://randomuser.me/api?results=10')
        .then(response => response.json())
        .then(data => {
            dispatch(setUsersAction(data))
            dispatch(usersStoppedLoadingAction())
        })
}
const initialState = {
    users: null,
    isUsersAreLoading: false
}



export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.data
            }
        case USERS_STARTED_LOADING:
            return {
                ...state,
                isUsersAreLoading: true
            }
        case USERS_STOPPED_LOADING:
            return {
                ...state,
                isUsersAreLoading: false
            }
        default:
            return state
    }
}